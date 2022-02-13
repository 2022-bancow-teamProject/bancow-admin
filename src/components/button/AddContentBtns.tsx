import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { AddContentBtn } from "../../interfaces";
import Add from "./Add";
import Cancel from "./Cancel";

const AddContentBtns: React.FC<AddContentBtn> = ({ add, btnstate }) => {
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
      <Add func={add} btnstate={btnstate} />
      <Cancel func={cancel} />
    </Box>
  );
};

export default AddContentBtns;
