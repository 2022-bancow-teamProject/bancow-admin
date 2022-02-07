import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegEmail =
  /^([\w._-])*[a-zA-Z0-9]+([\w._-])*([a-zA-Z0-9])+([\w._-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;

const message = {
  email: "정확한 이메일 주소를 입력해 주세요",
  longpass: "8자리 이상의 비밀번호를 설정해 주세요",
  fail: "이메일, 비밀번호를 다시 확인해 주세요"
};

type typeofError = "email" | "longpass" | "fail" | "";

export default function Signin() {
  const [error, setError] = useState<typeofError>("");
  const [eMail, setEMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!RegEmail.test(eMail)) {
      return setError("email");
    }
    if (password.length < 8) {
      return setError("longpass");
    }
    // 통신 경과가 fail 이면
    // return setError("fail");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 4 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          관리자 로그인
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={error === "email" || error === "fail"}
            type="email"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Admin email"
            autoFocus
            value={eMail}
            onChange={(e) => setEMail(e.target.value)}
          />
          <TextField
            error={error === "longpass" || error === "fail"}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <span style={{ color: "red" }}>{message[error]}</span>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
