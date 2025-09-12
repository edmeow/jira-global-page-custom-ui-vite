import {
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import type { JiraIssue, JiraProject } from "../../services/jira/types";
import useIssues from "../../hooks/useIssues";
import TabContainer from "../tab-container";
import { isLowPrioritySoonDue, isUnassigned } from "../../utils";
import { getIssueRowColor } from "./utils";
import { useState } from "react";
import FixModal from "../fix-modal";

interface IssueTableProps {
  project: JiraProject | null;
}

const IssueTable = ({ project }: IssueTableProps) => {
  const [fixIssue, setFixIssue] = useState<JiraIssue | null>(null);
  const { data: issues } = useIssues(project?.key);

  console.log(issues);

  if (!project)
    return (
      <TabContainer>
        <Alert severity="info">Select project to see issues</Alert>
      </TabContainer>
    );

  if (issues && issues.length == 0)
    return (
      <TabContainer>
        <Alert severity="info">Empty</Alert>
      </TabContainer>
    );

  return (
    <TabContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Summary</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Assignee</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issues?.map((issue) => (
            <TableRow
              key={issue.key}
              sx={{ backgroundColor: getIssueRowColor(issue) }}
            >
              <TableCell>{issue.key}</TableCell>
              <TableCell>{issue.fields?.summary}</TableCell>
              <TableCell>{issue.fields?.status?.name}</TableCell>
              <TableCell>
                {issue.fields?.assignee?.displayName || "Unassigned"}
              </TableCell>
              <TableCell>{issue.fields?.priority?.name}</TableCell>
              <TableCell>
                {(isUnassigned(issue) || isLowPrioritySoonDue(issue)) && (
                  <Button
                    variant="contained"
                    onClick={() => setFixIssue(issue)}
                  >
                    Fix
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <FixModal
          open={fixIssue !== null}
          issue={fixIssue}
          onClose={() => setFixIssue(null)}
          projectKey={project.key}
        />
      </Table>
    </TabContainer>
  );
};

export default IssueTable;
