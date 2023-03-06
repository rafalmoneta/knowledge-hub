import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { Layout } from "@/components/layout";
import { trpc } from "@/utils/api";
import { Button } from "@/components/button";

const AdminPage: NextPage = () => {
  const postsFeedQuery = trpc.post.feed.useQuery();

  if (postsFeedQuery.isLoading) return <div>Loading...</div>;
  if (postsFeedQuery.isError) return <div>Error</div>;
  if (postsFeedQuery.data === null) return <div>Not found</div>;

  return (
    <>
      <Head>
        <title>Admin - Knowledge Hub</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="mx-auto max-w-3xl">
          <h1 className="my-16 text-2xl font-bold tracking-tight md:text-3xl">
            Admin Page
          </h1>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Technologies
              </h1>
              <Button onClick={() => console.log("clicked")}>
                Add New Technology
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminPage;

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

  if (session.user.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/",
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
