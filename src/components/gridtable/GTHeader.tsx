import { Grid } from "@mui/material";
import { GTHeaderProps } from "../../interfaces";

const GTHeader: React.FC<GTHeaderProps> = ({ children }) => {
  return (
    <Grid
      container
      sx={{ height: "40px", marginTop: 2, backgroundColor: "#b2bec3" }}
    >
      {children}
    </Grid>
  );
};

export default GTHeader;
