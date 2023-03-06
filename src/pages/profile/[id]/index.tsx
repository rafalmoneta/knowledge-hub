import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import React from "react";
import Container from "@/components/container";
import { Layout } from "@/components/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "@/utils/api";
import { Avatar } from "@/components/avatar";
import {
  Menu,
  MenuButton,
  MenuItemButton,
  MenuItems,
  MenuItemsContent,
} from "@/components/menu";
import { IconButton } from "@/components/icon-button";
import ProfileLoading from "@/components/loading/ProfileLoading";
import { useSession } from "next-auth/react";

export const TechnologyTag = ({
  name,
  expertise,
}: {
  name: string;
  expertise: number;
}) => {
  return (
    <div className="focus-ring text-secondary inline-flex h-[34px] items-center justify-center rounded-md border border-secondary bg-primary text-sm font-semibold transition-colors hover:bg-secondary">
      <div className="h-full border-r px-4 leading-[32px]">{name}</div>
      <div className="px-2">{expertise}</div>
    </div>
  );
};

const UserPage: NextPage<{ userId: string }> = ({ userId }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const userQuery = trpc.user.profile.useQuery({ id: userId });

  if (userQuery.isLoading) {
    return (
      <Layout>
        <Container>
          <div className="divide-y">
            <ProfileLoading />
          </div>
        </Container>
      </Layout>
    );
  }

  if (userQuery.isError) return <div>Error: {userQuery.error.message}</div>;
  if (userQuery.data === null) return <div>Not found</div>;

  const isUserAuthor = userQuery.data.id === session?.user.id;
  const isUserAdmin = session?.user.role === "ADMIN";

  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <Layout>
        <Container>
          <div className="divide-y">
            <div className="mx-auto w-full max-w-3xl">
              <div className="relative rounded-lg border p-4">
                <div className="flex items-center">
                  <Avatar
                    name={userQuery.data.name || "Anonymous"}
                    size="lg"
                    src={userQuery.data.image}
                  />
                  <div className="ml-8">
                    <h1 className="text-2xl font-bold">
                      {userQuery.data.name}
                    </h1>
                    <p className="text-gray-500">{userQuery.data.email}</p>
                    <p className="text-gray-500">
                      {userQuery.data?.position
                        ? userQuery.data.position
                        : "Position Not Specified"}
                    </p>
                  </div>
                </div>
                {isUserAuthor || isUserAdmin ? (
                  <div className="absolute top-4 right-4 w-8">
                    <Menu>
                      <MenuButton as={IconButton} variant={"secondary"}>
                        <span>...</span>
                      </MenuButton>

                      <MenuItems className="w-28">
                        <MenuItemsContent>
                          {isUserAuthor ? (
                            <MenuItemButton
                              onClick={() =>
                                router.push(`/profile/${userId}/edit`)
                              }
                            >
                              Edit
                            </MenuItemButton>
                          ) : null}
                        </MenuItemsContent>
                      </MenuItems>
                    </Menu>
                  </div>
                ) : null}
              </div>

              <div className="mt-8 rounded-lg border p-4">
                <div>
                  <h1 className="text-2xl font-bold">Technologies and Tools</h1>
                  <p className="text-gray-500">
                    Showcase your core competencies and technical expertise.
                    This section typically includes a list of programming
                    languages, frameworks, software, and tools that the you are
                    proficient in. Displayed as: Name of the technology and the
                    level of expertise on scale from 1 to 5
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {userQuery.data.skills.map((skill) => (
                      <TechnologyTag
                        key={skill.id}
                        name={skill.technology.name}
                        expertise={skill.expertise}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-gray-500">
                    Other skills
                  </h2>
                  <p className="text-gray-500">
                    Highlighted additional abilities that may not directly
                    relate to their technical expertise. This could include
                    things like project management experience, teamwork and
                    collaboration skills, creativity, or experience with
                    particular software or tools.
                  </p>
                  <div className="mt-4">
                    {/* <div className="mb-2">Main technology</div> */}
                    <div className="focus-ring text-secondary inline-flex h-[34px] items-center justify-center rounded-md border border-secondary bg-primary px-4 text-sm font-semibold transition-colors hover:bg-secondary">
                      To be added
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-gray-500">
                    Would like to learn
                  </h2>
                  <p className="text-gray-500">
                    This section is about the skills or technologies that the
                    person is interested in learning in the future. It&apos;s
                    typically a short list of specific skills or technologies
                    that the person is eager to add to their repertoire.
                  </p>
                  <div className="mt-4">
                    {/* <div className="mb-2">Main technology</div> */}
                    <div className="focus-ring text-secondary inline-flex h-[34px] items-center justify-center rounded-md border border-secondary bg-primary px-4 text-sm font-semibold transition-colors hover:bg-secondary">
                      To be added
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  // TODO: Investigate why this is not working, why I cannot pass session as a props
  // but it works for passing the user => user: session.user
  return {
    props: {
      userId: query.id,
    },
  };
};
