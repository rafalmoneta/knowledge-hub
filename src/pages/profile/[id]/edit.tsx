import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/button";
import { ButtonLink } from "@/components/button-link";
import Container from "@/components/container";
import { Layout } from "@/components/layout";
import {
  ExpertiseSelector,
  TechnologySelector,
} from "@/components/skill-editor";
import { TextField } from "@/components/text-field";
import { classNames } from "@/lib/classnames";
import { trpc } from "@/utils/api";
import Head from "next/head";
import { useRouter } from "next/router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import ProfileLoading from "@/components/loading/ProfileLoading";

type FormValues = {
  position: string;
  skills: {
    technology: {
      id: string;
      name: string;
    };
    expertise: number;
  }[];
};

const EditProfilePage: NextPage<{ userId: string }> = ({ userId }) => {
  const router = useRouter();
  const userQuery = trpc.user.profile.useQuery({ id: userId });

  const technologiesQuery = trpc.technologies.list.useQuery({});
  const updateUserMutation = trpc.user.updateProfile.useMutation({
    async onSuccess(data) {
      await router.push(`/profile/${data.id}`);
    },
    onError(error) {
      console.log("User Update Error: ", error);
    },
  });

  const { register, handleSubmit, control, watch } = useForm<FormValues>({
    // TODO: Investigate if this is the best way to set "defaultValues" if
    // data is null or undefined - probably need only "values"
    defaultValues: {
      position: userQuery.data?.position ? userQuery.data.position : "",
      skills: userQuery.data?.skills ? userQuery.data.skills : [],
    },
    values: {
      position: userQuery.data?.position ? userQuery.data.position : "",
      skills: userQuery.data?.skills ? userQuery.data.skills : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm
    name: "skills", // unique name for your Field Array
  });

  const watchFieldArray = watch("skills");
  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchFieldArray[index],
  }));

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const skills = data.skills.map((skill) => ({
      technologyId: skill.technology.id,
      expertise: skill.expertise,
    }));

    const previousSkills = userQuery.data?.skills;

    const skillsToBeDeleted = previousSkills?.filter((skill) => {
      const found = skills.find((s) => s.technologyId === skill.technology.id);
      return !found;
    });

    const skillsToBeDeletedIds = skillsToBeDeleted?.map((skill) => skill.id);

    updateUserMutation.mutate({
      userId: userId,
      position: data.position,
      skills: skills,
      skillsToBeDeleted: skillsToBeDeletedIds,
    });
  };

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

  const technologiesOptions = technologiesQuery?.data
    ? technologiesQuery.data
    : [];

  return (
    <>
      <Head>
        <title>{userQuery.data.name}</title>
      </Head>
      <Layout>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
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
                    {/* <p className="text-gray-500">{userQuery.data.position}</p> */}

                    <TextField
                      {...register("position", { required: true })}
                      autoFocus
                      required
                      type="text"
                      placeholder="Your Position"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="mt-8 rounded-lg border p-4">
                <h1 className="text-2xl font-bold">Technologies and Tools</h1>
                <p className="text-gray-500">
                  Showcase your core competencies and technical expertise. This
                  section typically includes a list of programming languages,
                  frameworks, software, and tools that the you are proficient
                  in. Select the technology and level of expretise you have with
                  it. 1 - is the beginner and 5 - is the expert.
                </p>
                <div className="mt-8">
                  {controlledFields.map((field, index) => {
                    return (
                      <div key={field.id}>
                        {/* TODO: split this into controller that is selecting the technology
                        and then a separate controller that is selecting the expertise
                        use two different controllers and component for each field
                      */}
                        <div className="mb-2 flex items-center">
                          <div className="mr-4 flex-1">
                            <Controller
                              name={`skills.${index}.technology` as const}
                              control={control}
                              rules={{
                                required: true,
                                validate: (v) => v.id !== "" || v.name !== "",
                              }}
                              render={({ field }) => (
                                <TechnologySelector
                                  technologies={technologiesOptions}
                                  isLoading={technologiesQuery.isLoading}
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                          </div>
                          <Controller
                            name={`skills.${index}.expertise` as const}
                            control={control}
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <ExpertiseSelector
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                          <Button
                            variant="secondary"
                            className={classNames(
                              "ml-2 h-[38px] w-[38px] text-red-500"
                            )}
                            onClick={() => remove(Number(index))}
                          >
                            x
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button
                  className="mt-4"
                  onClick={() =>
                    append({
                      technology: {
                        id: "",
                        name: "",
                      },
                      expertise: 1,
                    })
                  }
                >
                  Add New Technology
                </Button>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex gap-4">
                <Button
                  type="submit"
                  isLoading={updateUserMutation.isLoading}
                  loadingChildren={"Saving"}
                >
                  {"Save"}
                </Button>

                <ButtonLink href={`/profile/${userId}`} variant="secondary">
                  Cancel
                </ButtonLink>
              </div>
            </div>
          </form>
        </Container>
      </Layout>
    </>
  );
};

export default EditProfilePage;

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

  return {
    props: {
      session,
      userId: query.id,
    },
  };
};
