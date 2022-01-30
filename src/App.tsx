import { Box } from "@mui/material";
import { useState } from "react";
import TopAppBar from "./components/TopAppBar";
import LeftGNB from "./components/LeftGNB";
import Main from "./components/Main";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box sx={{ display: "flex" }}>
      <TopAppBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <LeftGNB isOpen={isOpen} setIsOpen={setIsOpen} />
      <Main />
    </Box>
  );
}

export default App;
