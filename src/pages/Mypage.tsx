import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { axiosMyAuth } from "../api/auth";
import Swal from "sweetalert2";
import SetPassword from "../components/mypage/SetPassword";

const Mypage = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    if (username) {
      const email = sessionStorage.getItem("user");
      if (email) {
        setLoading(true);
        const res = await axiosMyAuth({ email, username });
        if (res) {
          Swal.fire(
            "요청 완료",
            "이메일로 인증 메일이 발송되었습니다.",
            "success"
          );
        } else {
          Swal.fire(
            "요청 실패",
            "메일 발송에 실패하였습니다. 다시 시도해 주세요",
            "error"
          );
        }
        setLoading(false);
      }
    }
  };
  return (
    <>
      <Box sx={{ padding: "40px" }}>
        <Typography component="h1" variant="h5">
          비밀 번호 변경을 위한 이메일 인증 요청
        </Typography>
        <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 4 }}>
          <TextField
            margin="normal"
            required
            name="username"
            label="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            variant="outlined"
            size="large"
            sx={{ height: "54px", marginTop: "6px" }}
            onClick={handleClick}
            disabled={loading}
          >
            보내기
          </Button>
        </Box>
      </Box>
      <SetPassword />
    </>
  );
};

export default Mypage;
