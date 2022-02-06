import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GridItemProps } from "../../interfaces";

const GridItem: React.FC<GridItemProps> = ({ das, id = null, children }) => {
  const navigate = useNavigate();
  const showDetail = () => {
    if (id === null) return;
    navigate(`${id}`);
  };
  return (
    <Grid item xs={das} sx={{ textAlign: "center" }}>
      <Box
        sx={{
          fontSize: 18,
          fontWeight: 700,
          lineHeight: 2.5,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          cursor: id === null ? "default" : "pointer"
        }}
        onClick={showDetail}
      >
        {children}
      </Box>
    </Grid>
  );
};

export default GridItem;
