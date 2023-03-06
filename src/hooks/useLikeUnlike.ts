import type { RouterOutputs } from "./../utils/api";
import type { QueryClient } from "@tanstack/react-query";
import { trpc } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";

export const getPostQueryKey = (postId: string) => [
  ["post", "get"],
  { input: { id: postId }, type: "query" },
];

const updateCache = async ({
  client,
  data,
  variables,
  action,
}: {
  client: QueryClient;
  data: { userId: string };
  variables: { id: string };
  action: "like" | "unlike";
}) => {
  const queryKey = getPostQueryKey(variables.id);

  await client.cancelQueries({ queryKey });

  const previousData = client.getQueryData(
    queryKey
  ) as RouterOutputs["post"]["get"];

  if (previousData) {
    client.setQueryData(queryKey, {
      ...previousData,
      likedBy:
        action === "like"
          ? [...previousData.likedBy, { user: { id: data.userId } }]
          : previousData.likedBy.filter((like) => like.user.id !== data.userId),
    });
  }

  return { previousData };
};

const useLikeUnlikePost = () => {
  const client = useQueryClient();

  const likeMutation = trpc.post.like.useMutation({
    onSuccess: (data, variables) =>
      updateCache({ client, data, variables, action: "like" }),
    onError: (error, variables, context) => {
      if (context?.previousData) {
        client.setQueryData(
          getPostQueryKey(variables.id),
          context.previousData
        );
      }
    },
    onSettled: async (data, error, variables) => {
      await client.invalidateQueries({
        queryKey: getPostQueryKey(variables.id),
      });
    },
  });

  const unlikeMutation = trpc.post.unlike.useMutation({
    onSuccess: (data, variables) =>
      updateCache({ client, data, variables, action: "unlike" }),
    onError: (error, variables, context) => {
      if (context?.previousData) {
        client.setQueryData(
          getPostQueryKey(variables.id),
          context.previousData
        );
      }
    },
    onSettled: async (data, error, variables) => {
      await client.invalidateQueries({
        queryKey: getPostQueryKey(variables.id),
      });
    },
  });

  return { likeMutation, unlikeMutation };
};

export default useLikeUnlikePost;
