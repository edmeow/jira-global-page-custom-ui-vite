import {
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import TabContainer from "../tab-container";
import type { JiraProject } from "../../services/jira/types";
import { useAssignableUsers } from "../../hooks/useAssignableUsers";

interface TeamTabProps {
  project: JiraProject | null;
}

const TeamTab = ({ project }: TeamTabProps) => {
  const { data: members, isLoading, error } = useAssignableUsers(project?.key);

  console.log(members)

  if (!project)
    return (
      <TabContainer>
        <Alert severity="info">Select project to see team</Alert>
      </TabContainer>
    );

  if (isLoading)
    return (
      <TabContainer>
        <CircularProgress />
      </TabContainer>
    );

  if (error)
    return (
      <TabContainer>
        <Alert severity="error">Error loading team: {error.message}</Alert>
      </TabContainer>
    );

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Activity</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {members?.map((member) => (
          <TableRow key={member.accountId}>
            <TableCell>{member.displayName}</TableCell>
            <TableCell>{member.emailAddress}</TableCell>
            <TableCell>{member.active ? "Yes" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeamTab;
