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
  checked,
  setChecked
}) => {
  const nav = useNavigate();

  const toggleHandler = () => {
    setIsDelete((curr) => !curr);
    setChecked([]);
  };
  // 삭제 버튼에 대한 함수 필요 with api

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
      {isDelete && <Delete func={toggleHandler} />}
      {isDelete ? (
        <Cancel func={toggleHandler} />
      ) : (
        <Select func={toggleHandler} />
      )}
    </Box>
  );
};

export default GTselector;
