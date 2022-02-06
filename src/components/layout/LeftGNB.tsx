import { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  Toolbar,
  Collapse
} from "@mui/material";
import { ChevronLeft, ExpandLess, ExpandMore } from "@mui/icons-material";
import { MenuProps } from "../../interfaces";
import { drawerWidth } from "../../theme";
import MenuItem from "./MenuItem";

const LeftGNB: React.FC<MenuProps> = ({ isOpen, setIsOpen }) => {
  const [isDrop, setIsDrop] = useState(true);
  const handleClick = () => {
    setIsDrop((state) => !state);
  };
  return (
    <Box
      sx={{
        width: drawerWidth,
        height: "100vh",
        overflow: "hidden",
        flexShrink: 0,
        transition: "all 0.4s ease-out",
        ...(isOpen && {
          width: 0
        })
      }}
    >
      <Toolbar
        sx={{ backgroundColor: "#556bd6", boxShadow: "0px 0.5px 2px #556bd6" }}
      >
        <IconButton
          sx={{ position: "absolute", right: 16, color: "white" }}
          onClick={() => setIsOpen(true)}
        >
          <ChevronLeft sx={{ fontSize: 36 }} />
        </IconButton>
      </Toolbar>
      <Divider />
      <Box
        sx={{
          height: "100%",
          paddingTop: 2,
          borderRight: "1px solid #AAAAB1"
        }}
      >
        <MenuItem title="컨텐츠 관리" onClick={handleClick}>
          {isDrop ? <ExpandLess /> : <ExpandMore />}
        </MenuItem>
        <Collapse in={isDrop} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <MenuItem title="구매자 리뷰" path="review"></MenuItem>
            <MenuItem title="농가 소개 정보" path="farmer"></MenuItem>
            <MenuItem title="공지" path="notice"></MenuItem>
            <MenuItem title="언론 보도" path="news"></MenuItem>
            <MenuItem title="이벤트" path="event"></MenuItem>
            <MenuItem title="FAQ" path="faq"></MenuItem>
          </List>
        </Collapse>
        <List>
          <MenuItem title="QnA" path="qna"></MenuItem>
          <MenuItem title="팝업" path="popup"></MenuItem>
        </List>
        <Divider />
      </Box>
    </Box>
  );
};

export default LeftGNB;
