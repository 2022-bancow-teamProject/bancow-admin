import { Box, CssBaseline } from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Signin from "./pages/Signin";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const loginGuarder = () => {
    const token = sessionStorage.getItem("token");
    return !token;
  };
  useEffect(() => {
    if ("/" === pathname) {
      return navigate("/manager");
    }
    if ("/manager" !== pathname && "/manager/signup" !== pathname) {
      if (loginGuarder()) {
        return navigate("/manager");
      }
    }
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Routes>
        <Route path="/manager" element={<Signin />} />
        <Route path="/manager/signup" element={<Signup />} />
        <Route path="/manager/admin/*" element={<Main />} />
      </Routes>
    </Box>
  );
}

export default App;
