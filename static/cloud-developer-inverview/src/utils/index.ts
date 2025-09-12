import type { JiraIssue } from "../services/jira/types";

const MS_IN_DAY = 24 * 60 * 60 * 1000;
const WITHIN_DAYS = 7;

export const isUnassigned = (issue: JiraIssue) => !issue.fields?.assignee;

export const isLowPrioritySoonDue = (issue: JiraIssue) => {
  const name = issue.fields?.priority?.name;
  const due = issue.fields?.duedate;
  if (!name || !due) return false;

  if (!["Low", "Lowest"].includes(name)) return false;

  const dueDate = new Date(due);
  if (Number.isNaN(dueDate.getTime())) return false;

  const now = Date.now();
  return dueDate.getTime() < now + WITHIN_DAYS * MS_IN_DAY;
};
