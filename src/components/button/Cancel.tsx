import { Button } from "@mui/material";
import { ChangeBtn } from "../../interfaces";

const Cancel: React.FC<ChangeBtn> = ({ setIsDelete }) => {
  return (
    <Button
      variant="contained"
      sx={{
        fontSize: 16,
        fontWeight: 700,
        width: 100,
        backgroundColor: "#636e72",
        "&:hover": {
          backgroundColor: "#4f585b"
        }
      }}
      onClick={() => setIsDelete(false)}
    >
      취소
    </Button>
  );
};

export default Cancel;
