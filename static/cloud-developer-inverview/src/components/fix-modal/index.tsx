import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Fade,
} from "@mui/material";
import type { JiraIssue } from "../../services/jira/types";
import { isLowPrioritySoonDue, isUnassigned } from "../../utils";
import { useAssignableUsers } from "../../hooks/useAssignableUsers";
import { getPriorityById } from "./utils";
import { useUpdateIssue } from "../../hooks/useUpdateIssue";

interface FixModalProps {
  open: boolean;
  onClose: () => void;
  projectKey: string;
  issue: JiraIssue | null;
}

const FixModal = ({ open, issue, onClose, projectKey }: FixModalProps) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  const { data: users } = useAssignableUsers(projectKey);
  const updateIssueMutatuion = useUpdateIssue();

  const assignedIssue = Boolean(issue && isUnassigned(issue));
  const lowPrioritySoonDueIssue = Boolean(issue && isLowPrioritySoonDue(issue));

  console.log(users);

  const handleFix = () => {
    if (!issue) return;
    const fields: JiraIssue["fields"] = {};
    if (selectedUser) {
      fields.assignee = users?.find(
        ({ accountId }) => accountId === selectedUser
      );
    }
    if (selectedPriority) {
      fields.priority = getPriorityById(selectedPriority);
    }
    updateIssueMutatuion.mutate({ key: issue.key, projectKey, fields });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Fix Issue {issue?.key}</DialogTitle>
      <DialogContent>
        <Stack pt={2} width="400px" spacing={2}>
          <Fade in={assignedIssue}>
            <FormControl fullWidth>
              <InputLabel>Assign to</InputLabel>
              <Select
                label="Assign to"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value as string)}
              >
                {users?.map((user) => (
                  <MenuItem key={user.accountId} value={user.accountId}>
                    {user.displayName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Fade>
          <Fade in={lowPrioritySoonDueIssue}>
            <FormControl fullWidth>
              <InputLabel>Raise Priority to</InputLabel>
              <Select
                label="Raise Priority to"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value as string)}
              >
                <MenuItem value="3">Medium</MenuItem>
                <MenuItem value="2">High</MenuItem>
              </Select>
            </FormControl>
          </Fade>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleFix}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FixModal;
