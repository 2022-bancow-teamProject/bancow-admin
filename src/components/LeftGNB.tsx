import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Collapse
} from "@mui/material";
import { ChevronLeft, ExpandLess, ExpandMore } from "@mui/icons-material";
import { MenuProps } from "../interfaces";
import { useState } from "react";

const drawerWidth = 240;

const LeftGNB: React.FC<MenuProps> = ({ isOpen, setIsOpen }) => {
  const [isDrop, setIsDrop] = useState(false);
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
        <ListItem button onClick={handleClick}>
          <ListItemText primary="Inbox" />
          {isDrop ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={isDrop} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem button>
              <ListItemText primary="Starred" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Starred" />
            </ListItem>
          </List>
        </Collapse>
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} sx={{ whiteSpace: "nowrap" }} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Box>
  );
};

export default LeftGNB;
