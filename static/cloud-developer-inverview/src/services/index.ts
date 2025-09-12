import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const queryKeys = {
  projects: "projects",
  issues: "issues",
  assignableUsers: "assignableUsers",
  teamMembers: "teamMembers",
};
