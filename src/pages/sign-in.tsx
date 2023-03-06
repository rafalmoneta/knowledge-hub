import { Button } from "@/components/button";
import { GithubIcon } from "@/components/icons";
import { authOptions } from "@/server/auth";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";
import Head from "next/head";

const SignIn = () => {
  return (
    <>
      <Head>
        <title>🌳 Digital Garden</title>
      </Head>

      <div className="min-h-screen w-full bg-primary-inverse dark:bg-primary">
        <main className="relative flex min-h-screen flex-col items-center">
          <div className="relative top-24">
            <h1 className="text-center font-poppins text-7xl font-bold">
              Knowledge Hub
            </h1>
            <div className="mx-auto mt-16 max-w-[400px] space-y-4 text-center">
              <Button
                variant="secondary"
                className="flex w-full cursor-pointer items-center justify-center rounded text-center"
                onClick={() => signIn("github", { callbackUrl: "/" })}
              >
                <GithubIcon className="mr-2" />
                Sign in with Github
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);

  if (session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};

export default SignIn;
