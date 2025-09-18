import { useMutation } from "@tanstack/react-query";
import { queryClient, queryKeys } from "../services";
import JiraService from "../services/jira";
import type { JiraUser } from "../services/jira/types";

const chooseRandomUser = (users: JiraUser[]) => {
  return users[Math.floor(Math.random() * users.length)];
};

const useAutoAssign = () => {
  return useMutation({
    mutationFn: async (projectKey: string) => {
      const [issues, users] = await Promise.all([
        JiraService.getIssues(projectKey),
        JiraService.getAssignableUsers(projectKey),
      ]);

      const unassignedIssues = issues.filter((issue) => !issue.fields.assignee);

      const activeUsers = users.filter((user) => user.active);

      if (activeUsers.length === 0) return;

      for (const issue of unassignedIssues) {
        const randomUser = chooseRandomUser(activeUsers);
        await JiraService.putUpdateIssue(issue.key, {
          assignee: { accountId: randomUser.accountId },
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.issues] });
      // queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
  });
};

export default useAutoAssign;
