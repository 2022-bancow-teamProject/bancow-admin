import { useNavigate } from "react-router-dom";
import { ListItem, ListItemText } from "@mui/material";
import { MenuItemProps } from "../../interfaces";

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  onClick,
  path = "",
  children
}) => {
  const navigate = useNavigate();
  const handleClick = (path: string) => {
    if (path) navigate(`/manager/admin/${path}`);
    if (onClick) onClick();
  };
  return (
    <ListItem button onClick={() => handleClick(path)}>
      <ListItemText primary={title} sx={{ whiteSpace: "nowrap" }} />
      {children}
    </ListItem>
  );
};

export default MenuItem;
