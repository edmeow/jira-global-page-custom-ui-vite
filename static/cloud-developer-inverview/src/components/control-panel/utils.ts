import type { JiraIssue } from "../../services/jira/types";
import { isLowPrioritySoonDue, isUnassigned } from "../../utils";

export const getStatistics = (issues?: JiraIssue[]) => {
  if (!issues) return null;
  return {
    total: issues.length,
    unassigned: issues.filter((issue) => !issue.fields?.assignee).length,
    problematic: issues.filter(
      (issue) => isUnassigned(issue) || isLowPrioritySoonDue(issue)
    ).length,
  };
};
