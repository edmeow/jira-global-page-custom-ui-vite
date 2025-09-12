import { useQuery } from "@tanstack/react-query";
import type { JiraProject } from "../services/jira/types";
import JiraService from "../services/jira";
import { queryKeys } from "../services";

const useProjects = () => {
  return useQuery<JiraProject[]>({
    queryKey: [queryKeys.projects, "all"],
    queryFn: () => JiraService.getProjects(),
  });
};

export default useProjects;
