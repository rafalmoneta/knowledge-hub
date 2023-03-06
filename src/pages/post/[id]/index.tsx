import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import React from "react";
import { Author } from "@/components/author";
import { Avatar } from "@/components/avatar";
import { ButtonLink } from "@/components/button-link";
import AddCommentForm from "@/features/comment/comment-form";
import Comment from "@/features/comment/comment-view";
import Container from "@/components/container";
import { DateDisplay } from "@/components/date-display";
import { HtmlView } from "@/components/html-view";
import { IconButton } from "@/components/icon-button";
import { MessageIcon } from "@/components/icons";
import { Layout } from "@/components/layout";
import { LikeButton } from "@/components/like-button";
import {
  Menu,
  MenuButton,
  MenuItemButton,
  MenuItems,
  MenuItemsContent,
} from "@/components/menu";
import useLikeUnlikePost from "@/hooks/useLikeUnlike";
import { trpc } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import ConfirmDeletePostDialog from "@/features/post/post-delete";
import PostLoading from "@/components/loading/PostLoading";

const PostPage: NextPage<{ postId: string }> = ({ postId }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  const postQuery = trpc.post.get.useQuery({ id: postId });
  const { likeMutation, unlikeMutation } = useLikeUnlikePost();

  if (postQuery.isLoading) {
    return (
      <Layout>
        <Container>
          <PostLoading />
        </Container>
      </Layout>
    );
  }

  if (postQuery.isError) return <div>Error: {postQuery.error.message}</div>;
  if (postQuery.data === null) return <div>Not found</div>;

  const isUserAuthor = postQuery.data.author.id === session?.user.id;
  const isUserAdmin = session?.user.role === "ADMIN";

  return (
    <>
      <Head>
        <title>{postQuery.data.title}</title>
      </Head>
      <Layout>
        <Container>
          <div className="divide-y">
            <div className="mx-auto w-full max-w-3xl">
              <div className="mx-auto mb-8 max-w-2xl text-center">
                <DateDisplay date={postQuery.data.createdAt} />

                <h1 className="md:leading-14 mt-2 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl">
                  {postQuery.data.title}
                </h1>
              </div>

              <div className="my-6 flex items-center justify-between  border-t border-b py-6">
                <Author author={postQuery.data.author} />
                <div>
                  {isUserAuthor || isUserAdmin ? (
                    <Menu>
                      <MenuButton as={IconButton} variant={"secondary"}>
                        <span>...</span>
                      </MenuButton>

                      <MenuItems className="w-28">
                        <MenuItemsContent>
                          {isUserAuthor ? (
                            <MenuItemButton
                              onClick={() =>
                                router.push(`/post/${postId}/edit`)
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
                  ) : null}
                </div>
              </div>

              <HtmlView html={postQuery.data.contentHtml} />

              <div className="clear-both my-8 flex gap-4">
                <LikeButton
                  likedBy={postQuery.data.likedBy}
                  onLike={() => likeMutation.mutate({ id: postId })}
                  onUnlike={() => unlikeMutation.mutate({ id: postId })}
                />
                <ButtonLink
                  href={`/post/${postQuery.data.id}#comments`}
                  variant="secondary"
                >
                  <MessageIcon className="text-secondary h-4 w-4" />
                  <span className="ml-1.5 pl-1">
                    {postQuery.data.comments.length}
                  </span>
                </ButtonLink>
              </div>

              <div id="comments" className="space-y-12 border-t py-16">
                <ul className="space-y-12">
                  {postQuery.data.comments.map((comment) => (
                    <li key={comment.id}>
                      <Comment
                        key={comment.id}
                        comment={comment}
                        postId={postId}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-start gap-2 sm:gap-4">
                <Avatar
                  name={session?.user?.name || "Anonymous"}
                  src={session?.user?.image || ""}
                />
                <AddCommentForm postId={postId} />
              </div>

              <ConfirmDeletePostDialog
                postId={postId}
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

export default PostPage;

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
      postId: query.id,
    },
  };
};
