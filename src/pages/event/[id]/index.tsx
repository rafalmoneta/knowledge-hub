import React from "react";
import { Author } from "@/components/author";
import Container from "@/components/container";
import EventCard from "@/components/event-card";
import { HtmlView } from "@/components/html-view";
import { IconButton } from "@/components/icon-button";
import { Layout } from "@/components/layout";
import {
  MenuButton,
  MenuItemButton,
  MenuItems,
  MenuItemsContent,
} from "@/components/menu";
import { trpc } from "@/utils/api";
import { Menu } from "@headlessui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import ConfirmDeleteEventDialog from "@/components/event-delete";

const EventPage: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const eventId = router.query.id as string;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const eventQuery = trpc.event.get.useQuery({ id: eventId });

  if (eventQuery.isLoading) {
    return (
      <Layout>
        <Container>
          <div className="animate-pulse">
            <div className="h-[400px] w-full rounded-2xl bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="mt-7 space-y-3">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            {[...Array(3)].map((_, idx) => (
              <React.Fragment key={idx}>
                <div className="grid grid-cols-3 gap-4 pt-8">
                  <div className="col-span-2 h-5 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="col-span-1 h-5 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="h-5 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 h-5 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="col-span-2 h-5 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="h-5 w-3/5 rounded bg-gray-200 dark:bg-gray-700" />
              </React.Fragment>
            ))}
          </div>
        </Container>
      </Layout>
    );
  }

  if (eventQuery.isError) return <div>Error: {eventQuery.error.message}</div>;
  if (eventQuery.data === null) return <div>Not found</div>;

  // TODO: change it to the current user id
  // const isUserAuthor = postQuery.data.author.id === "1";
  const isUserAuthor = true;
  const isUserAdmin = true;

  return (
    <>
      <Head>
        <title>Event</title>
      </Head>
      <Layout>
        <Container>
          <div className="divide-y">
            <div className="mx-auto w-full max-w-3xl">
              <div className="mb-16">
                <EventCard event={eventQuery.data} />
              </div>
              {isUserAuthor || isUserAdmin ? (
                <div className="mt-6 mb-12 flex items-center justify-between  border-t border-b py-6">
                  <div>Admin Panel</div>
                  <div className="relative">
                    <Menu>
                      <MenuButton as={IconButton} variant={"secondary"}>
                        <span>...</span>
                      </MenuButton>

                      <MenuItems className="w-28">
                        <MenuItemsContent>
                          {isUserAuthor ? (
                            <MenuItemButton
                              onClick={() =>
                                router.push(`/event/${eventId}/edit`)
                              }
                            >
                              Edit
                            </MenuItemButton>
                          ) : null}
                          {isUserAdmin || isUserAuthor ? (
                            <MenuItemButton
                              className="text-red-600"
                              onClick={() => setIsDeleteModalOpen(true)}
                            >
                              Delete
                            </MenuItemButton>
                          ) : null}
                        </MenuItemsContent>
                      </MenuItems>
                    </Menu>
                  </div>
                </div>
              ) : null}

              <div className="">
                <div className="mb-8">
                  <h3 className="mb-4 text-lg font-semibold">
                    Speaker Information:
                  </h3>
                  <Author author={eventQuery.data.speaker} />
                </div>

                <div className="mb-8">
                  <h3 className="mb-2 text-lg font-semibold">
                    Event Description:
                  </h3>
                  {eventQuery.data.descriptionHtml ? (
                    <HtmlView html={eventQuery.data.descriptionHtml} />
                  ) : (
                    <p>{"Description for the event not provided :("}</p>
                  )}
                </div>

                <div className="mb-8">
                  <h3 className="mb-2 text-lg font-semibold">Event Summary:</h3>
                  {eventQuery.data.summaryHtml ? (
                    <HtmlView html={eventQuery.data.summaryHtml} />
                  ) : (
                    <p>{"Summary for the event not provided :("}</p>
                  )}
                </div>

                <div className="mb-8">
                  <h3 className="mb-2 text-lg font-semibold">
                    Event Resources and Materials:
                  </h3>
                  <a
                    href={
                      eventQuery.data?.resources
                        ? eventQuery.data.resources
                        : "#"
                    }
                    className="block w-full rounded-md border border-blue-500 py-2 px-4 text-blue-500 hover:border-blue-600 hover:text-blue-600"
                  >
                    <span>
                      {
                        "Link to the resources and materials available on Google Drive"
                      }
                    </span>
                  </a>
                </div>
              </div>

              <ConfirmDeleteEventDialog
                eventId={eventId}
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
              />
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default EventPage;
