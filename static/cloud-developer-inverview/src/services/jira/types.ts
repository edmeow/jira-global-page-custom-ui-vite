export interface JiraUser {
  accountId: string;
  displayName?: string;
  active?: boolean;
  emailAddress?: string;
}

export interface JiraIssue {
  id: string;
  key: string;
  fields: {
    summary?: string;
    status?: { name?: string };
    assignee?: JiraUser | null;
    priority?: { id: string, name?: string };
    duedate?: string;
  };
}

export interface JiraProject {
  id: string;
  name: string;
  key: string;
}
