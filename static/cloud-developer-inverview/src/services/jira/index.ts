import { requestJira } from "@forge/bridge";
import type { JiraIssue, JiraProject, JiraUser } from "./types";

class JiraService {
  static baseQuery = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  static async getProjects(): Promise<JiraProject[]> {
    const response = await requestJira(
      "/rest/api/3/project/search",
      JiraService.baseQuery
    );
    const data = await response.json();
    return data.values;
  }

  static async getIssues(projectKey: string): Promise<JiraIssue[]> {
    const jql = `project=${projectKey}`;
    const response = await requestJira(
      `/rest/api/3/search?jql=${encodeURIComponent(
        jql
      )}&fields=key,summary,status,assignee,priority,duedate`,
      JiraService.baseQuery
    );
    const data = await response.json();
    return data.issues;
  }

  static async getAssignableUsers(projectKey: string): Promise<JiraUser[]> {
    const response = await requestJira(
      `/rest/api/3/user/assignable/search?project=${projectKey}`
    );
    const data = await response.json();
    return data;
  }

  static async putUpdateIssue(
    key: JiraIssue["key"],
    fields: JiraIssue["fields"]
  ) {
    await requestJira(`/rest/api/3/issue/${key}`, {
      ...JiraService.baseQuery,
      method: "PUT",
      body: JSON.stringify({ fields }),
    });
  }

  static async getTeam(projectKey: string): Promise<JiraUser[]> {
    const response = await requestJira(
      `/rest/api/3/user/assignable/search?project=${projectKey}`,
      JiraService.baseQuery
    );
    const data = await response.json();
    return data;
  }
}

export default JiraService;
