import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Add from "./Add";
import Cancel from "./Cancel";

const AddContentBtns = () => {
  const nav = useNavigate();
  const cancel = () => {
    nav(-1);
  };
  return (
    <Box
      sx={{
        height: 50,
        marginTop: 1,
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <Add />
      <Cancel func={cancel} />
    </Box>
  );
};

export default AddContentBtns;
