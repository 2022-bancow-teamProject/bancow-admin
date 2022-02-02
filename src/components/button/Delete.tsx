import { Button } from "@mui/material";
import { ChangeBtn } from "../../interfaces";

const Delete: React.FC<ChangeBtn> = ({ func }) => {
  return (
    <Button
      variant="contained"
      sx={{
        fontSize: 16,
        fontWeight: 700,
        width: 100,
        marginRight: 3,
        backgroundColor: "#e17055",
        "&:hover": {
          backgroundColor: "#d34725"
        }
      }}
      onClick={func}
    >
      삭제
    </Button>
  );
};

export default Delete;
