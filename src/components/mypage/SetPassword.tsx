import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { axiosChangePassword, axiosLogout } from "../../api/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const message = {
  longpass: "8자리 이상의 비밀번호를 설정해 주세요",
  notsame: "비밀번호와 비밀번호 확인의 값이 다릅니다"
};

type typeofError = "notsame" | "longpass" | "";

const SetPassword = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<typeofError>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (password1.length < 8) {
      return setError("longpass");
    }
    if (password1 !== password2) {
      return setError("notsame");
    }
    setLoading(true);
    const res = await axiosChangePassword({ password1, password2 });
    if (res) {
      Swal.fire(
        "변경 완료",
        "비밀 번호 변경이 완료 되었습니다.",
        "success"
      ).then(() => {
        axiosLogout();
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        navigate("/manager");
      });
    } else {
      setLoading(false);
      Swal.fire(
        "변경 실패",
        "요청을 실패하였습니다. 다시 시도해 주세요",
        "error"
      );
    }
  };

  useEffect(() => {
    setError("");
  }, []);
  return (
    <Box sx={{ padding: "40px" }}>
      <Typography component="h1" variant="h5">
        이메일 인증 후 새로운 비밀 번호 설정
      </Typography>
      <Box sx={{ mt: 1, display: "flex", flexDirection: "column" }}>
        <TextField
          error={error === "longpass"}
          margin="normal"
          required
          sx={{ width: "300px" }}
          name="password1"
          label="Password"
          type="password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <TextField
          error={error === "notsame"}
          margin="normal"
          required
          sx={{ width: "300px" }}
          name="password2"
          label="Password reconfirm"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        {error && <span style={{ color: "red" }}>{message[error]}</span>}
      </Box>
      <Button
        variant="outlined"
        size="large"
        sx={{ height: "54px", marginTop: 3 }}
        onClick={handleClick}
        disabled={loading}
      >
        변경하기
      </Button>
    </Box>
  );
};

export default SetPassword;
