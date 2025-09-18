import { Box } from "@mui/material";
import type { PropsWithChildren } from "react";

const TabContainer = ({ children }: PropsWithChildren) => {
  return <Box mt={4}>{children}</Box>;
};

export default TabContainer;
