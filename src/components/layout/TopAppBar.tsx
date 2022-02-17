import { AppBar, IconButton, Toolbar } from "@mui/material";
import { AccountCircle, Menu, Logout } from "@mui/icons-material";
import { MenuProps } from "../../interfaces";
import { drawerWidth } from "../../theme";
import { useNavigate } from "react-router-dom";
import { axiosLogout } from "../../api/auth";

const TopAppBar: React.FC<MenuProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const myPage = () => {
    navigate("/manager/admin/mypage");
  };
  const logout = async () => {
    const res = await axiosLogout();
    if (res) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      navigate("/manager");
    }
  };
  return (
    <AppBar
      sx={{
        position: "fixed",
        transition: "all 0.4s ease-out",
        ...(!isOpen && {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`
        })
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{
            position: "absolute",
            left: "50px",
            ...(!isOpen && { display: "none" })
          }}
          onClick={() => setIsOpen(false)}
        >
          <Menu />
        </IconButton>
        <IconButton
          color="inherit"
          sx={{ position: "absolute", right: "100px" }}
          onClick={myPage}
        >
          <AccountCircle />
        </IconButton>
        <IconButton
          color="inherit"
          sx={{ position: "absolute", right: "40px" }}
          onClick={logout}
        >
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
