import { Box, Grid } from "@mui/material";
import { GridItemProps } from "../../interfaces";

const GridItem: React.FC<GridItemProps> = ({ das, children }) => {
  return (
    <Grid item xs={das} sx={{ textAlign: "center" }}>
      <Box
        sx={{
          fontSize: 18,
          fontWeight: 700,
          lineHeight: 2.5,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden"
        }}
      >
        {children}
      </Box>
    </Grid>
  );
};

export default GridItem;
