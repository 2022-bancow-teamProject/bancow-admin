import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosSignup } from "../api/auth";
import Swal from "sweetalert2";

const RegEmail =
  /^([\w._-])*[a-zA-Z0-9]+([\w._-])*([a-zA-Z0-9])+([\w._-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;

const message = {
  email: "정확한 이메일 주소를 입력해 주세요",
  notsame: "비밀번호와 비밀번호 확인의 값이 다릅니다",
  longpass: "8자리 이상의 비밀번호를 설정해 주세요",
  name: "이름을 입력해 주세요"
};

type typeofError = "email" | "name" | "notsame" | "longpass" | "";

const Signup = () => {
  const [error, setError] = useState<typeofError>("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!RegEmail.test(email)) {
      return setError("email");
    }
    if (!username) {
      return setError("name");
    }
    if (password.length < 8) {
      return setError("longpass");
    }
    if (password !== password2) {
      return setError("notsame");
    }
    setLoading(true);
    const res = await axiosSignup({ email, username, password, password2 });
    // 통신 결과에 따른 분기
    if (res) {
      Swal.fire(
        "가입 완료",
        "입력하신 이메일로 인증 메일이 발송되었습니다",
        "success"
      ).then(() => {
        navigate("/manager");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "가입 실패",
        text: "이미 가입 요청된 이메일입니다 다시 시도해 주세요"
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    setError("");
  }, [email, username, password, password2]);

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
          <AssignmentIndIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          관리자 추가 등록
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={error === "email"}
            type="email"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Admin email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            error={error === "name"}
            type="text"
            margin="normal"
            required
            fullWidth
            name="name"
            label="Admin name"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            error={error === "longpass"}
            margin="normal"
            required
            fullWidth
            name="password1"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            error={error === "notsame"}
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Password reconfirm"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          {error && <span style={{ color: "red" }}>{message[error]}</span>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            color="success"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate("/manager")}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
