import { Button } from "@mui/material";
import { ChangeBtn } from "../../interfaces";

const List: React.FC<ChangeBtn> = ({ func }) => {
  return (
    <Button
      variant="contained"
      sx={{
        fontSize: 16,
        fontWeight: 700,
        width: 100,
        marginRight: 3,
        backgroundColor: "#ebe04a",
        "&:hover": {
          backgroundColor: "#ffd400"
        }
      }}
      onClick={func}
    >
      목록
    </Button>
  );
};

export default List;
