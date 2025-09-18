import { skipToken, useQuery } from "@tanstack/react-query";
import type { JiraIssue } from "../services/jira/types";
import JiraService from "../services/jira";
import { queryKeys } from "../services";

const useIssues = (projectKey?: string) => {
  return useQuery<JiraIssue[]>({
    queryKey: [queryKeys.issues, projectKey],
    queryFn: projectKey ? () => JiraService.getIssues(projectKey) : skipToken,
  });
};

export default useIssues;
