import { useState } from "react";
import { Alert, Box, CircularProgress, Tab, Tabs } from "@mui/material";
import useProjects from "./hooks/useProjects";
import IssueTable from "./components/issue-table";
import TeamTab from "./components/team-tab";
import ControlPanel from "./components/control-panel";
import type { JiraProject } from "./services/jira/types";

const App = () => {
  const [selectedProject, setSelectedProject] = useState<JiraProject | null>(null);
  const [tab, setTab] = useState(0);

  const { data: projects, isLoading, error } = useProjects();

  console.log(projects);

  if (isLoading) return <CircularProgress />;
  
  if (error)
    return (
      <Alert severity="error">Error loading projects: {error.message}</Alert>
    );

  return (
    <Box>
      <ControlPanel
        selectedProject={selectedProject}
        projects={projects || []}
        onProjectChange={(newProject) => setSelectedProject(newProject)}
      />
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="Issues" />
        <Tab label="Team" />
      </Tabs>
      {tab === 0 && <IssueTable project={selectedProject} />}
      {tab === 1 && <TeamTab project={selectedProject} />}
    </Box>
  );
};

export default App;
