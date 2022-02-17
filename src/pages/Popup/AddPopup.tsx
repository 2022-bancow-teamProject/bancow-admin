import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postPopupRequest } from "../../api/popup";
import { Container, Grid, Typography, Input } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import AddContentBtns from "../../components/button/AddContentBtns";
import DatePicker from "../../components/input/DatePicker";
import Swal from "sweetalert2";

const AddPopup = () => {
  const [title, setTitle] = useState("");
  const [file, setFiles] = useState<File>();
  const [datePick, setDatePick] = useState<[string | null, string | null]>([
    null,
    null
  ]);

  const [isEmpty, setIsEmpty] = useState(true);

  const inputPoster = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (title && file && datePick[0] && datePick[1]) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [title, file, datePick]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files) {
      setFiles(files[0]);
    }
  };

  const addPopup = async () => {
    const formData = new FormData();
    formData.append("popup_image", file as Blob);
    formData.append(
      "popup_request",
      new Blob(
        [
          JSON.stringify({
            title,
            start_date: datePick[0],
            end_date: datePick[1]
            // create_date: createDate
          })
        ],
        { type: "application/json" }
      )
    );

    const res = await postPopupRequest(formData);

    if (res) {
      Swal.fire(
        "등록 완료",
        "새로운 팝업 등록이 완료되었습니다.",
        "success"
      ).then(() => {
        navigate(-1);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "등록 실패",
        text: "팝업 등록에 실패하였습니다."
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
        팝업 등록
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
          <Typography variant="h6" component="h2" sx={{ marginBottom: 3 }}>
            팝업 등록 기간
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <DatePicker datePick={datePick} setDatePick={setDatePick} />
          </Grid>
          {/* <Typography variant="h6" component="h2">
            팝업 생성 날짜
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            {const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
const createDate = year + "-" + month + "-" + date;
            <Input
              value={createDate} // 오늘 날짜
              fullWidth
            />}
          </Grid> */}
        </Grid>
        <AddContentBtns add={addPopup} btnstate={isEmpty} />
      </Container>
    </>
  );
};

export default AddPopup;
