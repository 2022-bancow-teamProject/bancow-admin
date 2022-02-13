import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { GTSelectorProps } from "../../interfaces";
import Add from "../button/Add";
import Cancel from "../button/Cancel";
import Delete from "../button/Delete";
import Select from "../button/Select";

const GTselector: React.FC<GTSelectorProps> = ({
  isDelete,
  setIsDelete,
  setChecked,
  delfunc
}) => {
  const nav = useNavigate();

  const toggleHandler = () => {
    setIsDelete((curr) => !curr);
    setChecked([]);
  };

  const deleteAction = () => {
    if (delfunc) {
      delfunc();
    }
    setIsDelete((curr) => !curr);
    setChecked([]);
  };

  const moveAddpage = () => {
    nav("add");
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
      <Add func={moveAddpage} />
      {isDelete && <Delete func={deleteAction} />}
      {isDelete ? (
        <Cancel func={toggleHandler} />
      ) : (
        <Select func={toggleHandler} />
      )}
    </Box>
  );
};

export default GTselector;
