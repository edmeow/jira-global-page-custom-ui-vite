import { useMutation } from "@tanstack/react-query";
import type { JiraIssue } from "../services/jira/types";
import JiraService from "../services/jira";
import { queryClient, queryKeys } from "../services";

interface UpdateIssueArgs {
  key: JiraIssue["key"];
  fields: JiraIssue["fields"];
  projectKey: string;
}

export const useUpdateIssue = () => {
  return useMutation({
    mutationFn: ({ key, fields }: UpdateIssueArgs) =>
      JiraService.putUpdateIssue(key, fields),

    onMutate: async ({ key, fields, projectKey }: UpdateIssueArgs) => {
      const queryKey = [queryKeys.issues, projectKey];

      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousIssues = queryClient.getQueryData<JiraIssue[]>(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData<JiraIssue[]>(queryKey, (old) =>
        old?.map((it) =>
          it.key === key
            ? { ...it, fields: { ...it.fields, ...fields } }
            : it
        )
      );

      return { previousIssues, projectKey };
    },

    onError: (_err, _variables, context) => {
      if (!context) return;
      queryClient.setQueryData(
        [queryKeys.issues, context.projectKey],
        context?.previousIssues
      );
    },

    onSettled: (_data, _error, _variables, context) => {
      if (!context) return;
      queryClient.invalidateQueries({
        queryKey: [queryKeys.issues, context.projectKey],
      });
      // queryClient.invalidateQueries({ queryKey: ["teamMembers", projectKey] });
    },
  });
};
