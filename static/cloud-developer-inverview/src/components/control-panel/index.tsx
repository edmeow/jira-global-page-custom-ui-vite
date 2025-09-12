import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import type { JiraProject } from "../../services/jira/types";
import { useState } from "react";
import useIssues from "../../hooks/useIssues";
import { getStatistics } from "./utils";
import useAutoAssign from "../../hooks/useAutoAssign";

interface ControlPanelProps {
  selectedProject: JiraProject | null;
  onProjectChange: (project: JiraProject) => void;
  projects?: JiraProject[];
}

const ControlPanel = ({
  selectedProject,
  projects,
  onProjectChange,
}: ControlPanelProps) => {
  const [isOpenAutoAssign, setConfirmAutoAssignOpen] = useState(false);

  const { data: issues } = useIssues(selectedProject?.key);
  const autoAssignMutation = useAutoAssign();

  const statistics = getStatistics(issues);

  const handleChangeProject = (projectName: string) => {
    const project = projects?.find(({ name }) => name === projectName);
    if (project) onProjectChange(project);
  };

  const toggleAutoAssignDialog = () => {
    setConfirmAutoAssignOpen((prev) => !prev);
  };

  const confirmAutoAssign = () => {
    autoAssignMutation.mutate(selectedProject!.key);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      <Box display="flex" flexGrow={0.5}>
        <Box width="120px">
          <FormControl fullWidth size="small">
            <InputLabel>Project</InputLabel>
            <Select
              label="Project"
              value={selectedProject?.name || ""}
              onChange={(e) => handleChangeProject(e.target.value)}
            >
              {projects?.map((project) => (
                <MenuItem key={project.id} value={project.name}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {statistics && (
          <Typography variant="caption" noWrap ml={1}>
            Total {statistics.total} | Unassigned {statistics.unassigned} |
            Problematic {statistics.problematic}
          </Typography>
        )}
      </Box>
      {selectedProject && (
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleAutoAssignDialog}
        >
          Auto-assign unassigned
        </Button>
      )}
      <Dialog open={isOpenAutoAssign} onClose={toggleAutoAssignDialog}>
        <DialogTitle>Confirm Mass Assignment</DialogTitle>
        <DialogContent>
          Assign unassigned issues to random active members?
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleAutoAssignDialog}>Cancel</Button>
          <Button onClick={confirmAutoAssign}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ControlPanel;
