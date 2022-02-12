import { Button } from "@mui/material";

const Mypage = () => {
  const handleClick = () => {
    console.log("data");
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button>
    </div>
  );
};

export default Mypage;
