import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import Head from "next/head";
import { Layout } from "@/components/layout";
import { trpc } from "@/utils/api";
import { PostCard } from "@/components/post-card";
import PostCardLoading from "@/components/loading/PostCardLoading";

const Home: NextPage = () => {
  const postsFeedQuery = trpc.post.feed.useQuery();

  if (postsFeedQuery.isLoading)
    return (
      <>
        <Head>
          <title>Knowledge Hub</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <div className="mx-auto max-w-3xl">
            <div>
              <ul className="divide-y">
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                {[...Array(3)].map((_, index) => (
                  <li key={index} className="py-10">
                    <PostCardLoading />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Layout>
      </>
    );
  if (postsFeedQuery.isError) return <div>Error</div>;
  if (postsFeedQuery.data === null) return <div>Not found</div>;

  return (
    <>
      <Head>
        <title>Knowledge Hub</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="mx-auto max-w-3xl">
          <div>
            <ul className="divide-y">
              {postsFeedQuery.data.posts.map((post) => (
                <li key={post.id} className="py-10">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
