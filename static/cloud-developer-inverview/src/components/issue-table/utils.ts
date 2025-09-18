import type { JiraIssue } from "../../services/jira/types";
import { isLowPrioritySoonDue, isUnassigned } from "../../utils";

export const getIssueRowColor = (issue: JiraIssue) => {
  if (isUnassigned(issue)) return "#f44336";
  if (isLowPrioritySoonDue(issue)) return "#ffcc32";
  return "inherit";
};
