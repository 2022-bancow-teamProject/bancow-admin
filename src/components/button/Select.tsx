import { Button } from "@mui/material";
import { ChangeBtn } from "../../interfaces";

const Select: React.FC<ChangeBtn> = ({ func }) => {
  return (
    <Button
      variant="contained"
      sx={{
        fontSize: 16,
        fontWeight: 700,
        width: 100,
        backgroundColor: "#00b894",
        "&:hover": {
          backgroundColor: "#009376"
        }
      }}
      onClick={func}
    >
      선택
    </Button>
  );
};

export default Select;
