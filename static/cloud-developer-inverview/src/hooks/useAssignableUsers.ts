import { skipToken, useQuery } from "@tanstack/react-query";
import type { JiraUser } from "../services/jira/types";
import JiraService from "../services/jira";
import { queryKeys } from "../services";

export const useAssignableUsers = (projectKey?: string) => {
  return useQuery<JiraUser[]>({
    queryKey: [queryKeys.assignableUsers, projectKey],
    queryFn: projectKey ? () => JiraService.getAssignableUsers(projectKey) : skipToken,
  });
};
