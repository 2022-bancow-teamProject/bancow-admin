import { useRef, useState } from "react";
import { Container, Grid, Typography, Input } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import AddContentBtns from "../../components/button/AddContentBtns";
import DatePicker from "../../components/input/DatePicker";

const AddEvent = () => {
  const [datePick, setDatePick] = useState<[string | null, string | null]>([
    null,
    null
  ]);
  const [file, setFiles] = useState<File>();

  const inputPoster = useRef<HTMLInputElement>(null);

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
            <Input required id="title" fullWidth />
          </Grid>
          <Typography variant="h6" component="h2">
            URL
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Input required id="url" fullWidth />
          </Grid>
          <Typography variant="h6" component="h2">
            내용
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Input required id="content" fullWidth />
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
                required
                id="img"
                type="file"
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
        <AddContentBtns />
      </Container>
    </>
  );
};

export default AddEvent;
