import { AddCircleOutline, Delete } from "@mui/icons-material";
import {
  Container,
  Grid,
  Typography,
  Input,
  Button,
  TextareaAutosize
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  axiosEditEventnoimg,
  axiosEditEventwidthimg,
  axiosGetEventDetail
} from "../../api/event";
import { format } from "date-fns";
import DatePicker from "../../components/input/DatePicker";
import AddContentBtns from "../../components/button/AddContentBtns";
import Swal from "sweetalert2";

const EditEvent = () => {
  const [datePick, setDatePick] = useState<[string | null, string | null]>([
    null,
    null
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFiles] = useState<File | string>("");
  const [status, setStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [createdate, setCreatedate] = useState("");

  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (title && content && url && datePick[0] && datePick[1]) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [title, content, url, file, datePick]);

  const inputPoster = useRef<HTMLInputElement>(null);

  const { pathname } = useLocation();
  const id = pathname.split("event/")[1];

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files) {
      setFiles(files[0]);
    }
  };

  const triggerInput = () => {
    if (inputPoster.current) {
      inputPoster.current.dispatchEvent(new MouseEvent("click"));
    }
  };

  const editEvent = async () => {
    let res;
    if (file) {
      const formData = new FormData();
      formData.append(
        "event_request",
        new Blob(
          [
            JSON.stringify({
              id: +id,
              title,
              content,
              url,
              start_date: datePick[0],
              end_date: datePick[1],
              status
            })
          ],
          { type: "application/json" }
        )
      );
      formData.append("event_image", file as Blob);
      res = await axiosEditEventwidthimg(formData);
    } else {
      res = await axiosEditEventnoimg({
        id: +id,
        title,
        content,
        url,
        start_date: `${datePick[0]}`,
        end_date: `${datePick[1]}`,
        status
      });
    }
    if (res) {
      Swal.fire("수정 완료", "이벤트 수정이 완료되었습니다.", "success").then(
        () => {
          navigate(-1);
        }
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "수정 실패",
        text: "이벤트 수정이 실패하였습니다."
      });
    }
  };

  useEffect(() => {
    (async () => {
      const data = await axiosGetEventDetail(id);
      if (data) {
        setTitle(data.title);
        setContent(data.content);
        setUrl(data.url);
        setFiles(data.image);
        setStatus(data.status);
        setDatePick([data.start_date, data.end_date]);
        setUsername(data.user_name);
        setCreatedate(data.create_date);
      }
    })();
  }, []);
  return (
    <>
      <Typography variant="h4" component="h2">
        Event 상세 / 수정
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
            <TextareaAutosize
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: "100%" }}
            />
          </Grid>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 3 }}>
            일정
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <DatePicker datePick={datePick} setDatePick={setDatePick} />
          </Grid>
          <Typography variant="h6" component="h2">
            Status
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Button
              variant="contained"
              color={status ? "success" : "error"}
              sx={{
                height: "40px",
                width: "80px",
                marginTop: 2,
                marginRight: 3,
                pointerEvents: "none"
              }}
            >
              {status ? "진행중" : "마감"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => setStatus((curr) => !curr)}
              sx={{ height: "40px", marginTop: 2 }}
            >
              변경
            </Button>
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
              {file &&
                (typeof file === "object" ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="img"
                    style={{ display: "block", height: "300px" }}
                  />
                ) : (
                  <img
                    src={file}
                    alt="imgs"
                    style={{ display: "block", height: "300px" }}
                  />
                ))}
              {file && (
                <Delete
                  onClick={(e) => {
                    e.stopPropagation();
                    setFiles("");
                  }}
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    fontSize: "28px"
                  }}
                />
              )}

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
          <Typography variant="h6" component="h2">
            작성자
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Input value={username} fullWidth disabled />
          </Grid>
          <Typography variant="h6" component="h2">
            작성일
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Input
              disabled
              value={
                createdate && format(new Date(createdate), "yyyy.MM.dd HH:MM")
              }
              fullWidth
            />
          </Grid>
        </Grid>
        <AddContentBtns add={editEvent} btnstate={isEmpty} editform />
      </Container>
    </>
  );
};

export default EditEvent;
