import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const RegEmail =
  /^([\w._-])*[a-zA-Z0-9]+([\w._-])*([a-zA-Z0-9])+([\w._-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;

const message = {
  email: "정확한 이메일 주소를 입력해 주세요",
  notsame: "비밀번호와 비밀번호 확인의 값이 다릅니다",
  longpass: "8자리 이상의 비밀번호를 설정해 주세요"
};

type typeofError = "email" | "notsame" | "longpass" | "";

const Signup = () => {
  const [error, setError] = useState<typeofError>("");
  const [eMail, setEMail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!RegEmail.test(eMail)) {
      return setError("email");
    }
    if (pass1.length < 8) {
      return setError("longpass");
    }
    if (pass1 !== pass2) {
      return setError("notsame");
    }
    console.log(eMail, pass1, pass2);
    // 통신 결과에 따른 분기
    // if (res === "success") {
    //   Swal.fire(
    //     "가입 완료",
    //     "입력하신 이메일로 인증 메일이 발송되었습니다",
    //     "success"
    //   ).then(()=> {navigate('/')});
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     title: "가입 실패",
    //     text: "다시 한번 가입을 시도해 주세요"
    //   });
    // }
  };

  useEffect(() => {
    setError("");
  }, [eMail, pass1, pass2]);

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
            value={eMail}
            onChange={(e) => setEMail(e.target.value)}
          />
          <TextField
            error={error === "longpass"}
            margin="normal"
            required
            fullWidth
            name="password1"
            label="Password"
            type="password"
            value={pass1}
            onChange={(e) => setPass1(e.target.value)}
          />
          <TextField
            error={error === "notsame"}
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Password reconfirm"
            type="password"
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
          />
          {error && <span style={{ color: "red" }}>{message[error]}</span>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate("/")}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
