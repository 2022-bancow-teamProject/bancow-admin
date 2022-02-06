import { Box, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Main from "./pages/Main";
import Signup from "./pages/Signup";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/*" element={<Main />} />
      </Routes>
    </Box>
  );
}

export default App;
