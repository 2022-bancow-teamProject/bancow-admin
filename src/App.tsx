import { Box, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<Main />} />
      </Routes>
    </Box>
  );
}

export default App;
