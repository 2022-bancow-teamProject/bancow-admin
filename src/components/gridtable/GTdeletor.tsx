import { Box } from "@mui/material";
import { GTSelectorProps } from "../../interfaces";
import Cancel from "../button/Cancel";
import Delete from "../button/Delete";
import Select from "../button/Select";

const GTdeletor: React.FC<GTSelectorProps> = ({
  isDelete,
  setIsDelete,
  setChecked,
  delfunc
}) => {
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

  return (
    <Box
      sx={{
        height: 50,
        marginTop: 1,
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      {isDelete && <Delete func={deleteAction} />}
      {isDelete ? (
        <Cancel func={toggleHandler} />
      ) : (
        <Select func={toggleHandler} />
      )}
    </Box>
  );
};

export default GTdeletor;
