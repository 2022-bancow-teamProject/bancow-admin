import { useEffect, useRef, useState } from "react";
import { Container, Grid, Typography, Input } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import AddContentBtns from "../../components/button/AddContentBtns";
import DatePicker from "../../components/input/DatePicker";
import { axiosAddEvent } from "../../api/event";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddEvent = () => {
  const [datePick, setDatePick] = useState<[string | null, string | null]>([
    null,
    null
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFiles] = useState<File>();

  const [isEmpty, setIsEmpty] = useState(true);

  const inputPoster = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (title && content && url && file && datePick[0] && datePick[1]) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [title, content, url, file, datePick]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files) {
      setFiles(files[0]);
    }
  };

  const addEvent = async () => {
    const formData = new FormData();
    formData.append("event_image", file as Blob);
    formData.append(
      "event_request",
      new Blob(
        [
          JSON.stringify({
            title,
            content,
            url,
            start_date: datePick[0],
            end_date: datePick[1]
          })
        ],
        { type: "application/json" }
      )
    );

    const res = await axiosAddEvent(formData);

    if (res) {
      Swal.fire(
        "등록 완료",
        "새로운 이벤트 등록이 완료되었습니다.",
        "success"
      ).then(() => {
        navigate(-1);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "등록 실패",
        text: "이벤트 등록에 실패하였습니다."
      });
    }
  };

  const triggerInput = () => {
    if (inputPoster.current) {
      inputPoster.current.dispatchEvent(new MouseEvent("click"));
    }
  };

  return (
    <>
      <Typography variant="h4" component="h2">
        Event 추가 등록
      </Typography>
      <Container
        maxWidth="sm"
        sx={{ marginTop: 5, height: "700px", overflowY: "auto" }}
      >
        <Grid container sx={{ marginBottom: 5 }}>
          <Typography variant="h6" component="h2">
            제목
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
          </Grid>
          <Typography variant="h6" component="h2">
            URL
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              fullWidth
            />
          </Grid>
          <Typography variant="h6" component="h2">
            내용
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
            />
          </Grid>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 3 }}>
            일정
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <DatePicker datePick={datePick} setDatePick={setDatePick} />
          </Grid>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 3 }}>
            이미지
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <div
              onClick={triggerInput}
              style={{
                width: "100%",
                height: "300px",
                marginBottom: "30px",
                borderRadius: "8px",
                border: "2px solid #e8e8e8",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              {file && <img src={URL.createObjectURL(file)} alt="img" />}
              {!file && (
                <AddCircleOutline
                  sx={{ color: "#d3cacad7", fontSize: "36px" }}
                />
              )}
              <input
                type="file"
                accept="image/png"
                style={{
                  position: "absolute",
                  width: "0",
                  height: "0",
                  padding: "0",
                  overflow: "hidden",
                  border: "0"
                }}
                ref={inputPoster}
                onChange={handleUpload}
              />
            </div>
          </Grid>
        </Grid>
        <AddContentBtns add={addEvent} btnstate={isEmpty} />
      </Container>
    </>
  );
};

export default AddEvent;
