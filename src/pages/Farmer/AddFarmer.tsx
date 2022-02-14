import { useEffect, useRef, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Input,
  TextareaAutosize
} from "@mui/material";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import AddContentBtns from "../../components/button/AddContentBtns";
import { axiosAddFarm } from "../../api/farm";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddFarmer = () => {
  const [farm_name, setFarmname] = useState("");
  const [ceo_name, setCeoname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [filefarm, setFilesfarm] = useState<File | string>();
  const [fileceo, setFilesceo] = useState<File | string>();

  const [isEmpty, setIsEmpty] = useState(true);

  const inputfarm = useRef<HTMLInputElement>(null);
  const inputceo = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (title && content && farm_name && ceo_name && filefarm && fileceo) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [title, content, farm_name, ceo_name, filefarm, fileceo]);

  const handleUpload1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files) {
      setFilesfarm(files[0]);
    }
  };
  const handleUpload2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files) {
      setFilesceo(files[0]);
    }
  };

  const triggerInputfram = () => {
    if (inputfarm.current) {
      inputfarm.current.dispatchEvent(new MouseEvent("click"));
    }
  };
  const triggerInputceo = () => {
    if (inputceo.current) {
      inputceo.current.dispatchEvent(new MouseEvent("click"));
    }
  };

  const addContent = async () => {
    const formData = new FormData();
    formData.append("farm_image", filefarm as Blob);
    formData.append("farm_ceo_image", fileceo as Blob);
    formData.append(
      "farm_request",
      new Blob(
        [
          JSON.stringify({
            farm_name,
            ceo_name,
            title,
            content
          })
        ],
        { type: "application/json" }
      )
    );

    const res = await axiosAddFarm(formData);

    if (res) {
      Swal.fire(
        "등록 완료",
        "새로운 농가 등록이 완료되었습니다.",
        "success"
      ).then(() => {
        navigate(-1);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "등록 실패",
        text: "농가 등록에 실패하였습니다."
      });
    }
  };

  return (
    <>
      <Typography variant="h4" component="h2">
        농가 추가 등록
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
            소개 내용
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <TextareaAutosize
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ width: "100%" }}
            />
          </Grid>
          <Typography variant="h6" component="h2">
            농가 이름
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Input
              value={farm_name}
              onChange={(e) => setFarmname(e.target.value)}
              fullWidth
            />
          </Grid>
          <Typography variant="h6" component="h2">
            농장주 이름
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Input
              value={ceo_name}
              onChange={(e) => setCeoname(e.target.value)}
              fullWidth
            />
          </Grid>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 3 }}>
            농장 이미지
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <div
              onClick={triggerInputfram}
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
              {filefarm &&
                (typeof filefarm === "object" ? (
                  <img
                    src={URL.createObjectURL(filefarm)}
                    alt="img"
                    style={{ display: "block", height: "300px" }}
                  />
                ) : (
                  <img
                    src={filefarm}
                    alt="imgs"
                    style={{ display: "block", height: "300px" }}
                  />
                ))}
              {filefarm && (
                <Delete
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilesfarm("");
                  }}
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    fontSize: "28px"
                  }}
                />
              )}

              {!filefarm && (
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
                ref={inputfarm}
                onChange={handleUpload1}
              />
            </div>
          </Grid>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 3 }}>
            농장주 이미지
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <div
              onClick={triggerInputceo}
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
              {fileceo &&
                (typeof fileceo === "object" ? (
                  <img
                    src={URL.createObjectURL(fileceo)}
                    alt="img"
                    style={{ display: "block", height: "300px" }}
                  />
                ) : (
                  <img
                    src={fileceo}
                    alt="imgs"
                    style={{ display: "block", height: "300px" }}
                  />
                ))}
              {fileceo && (
                <Delete
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilesceo("");
                  }}
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    fontSize: "28px"
                  }}
                />
              )}

              {!fileceo && (
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
                ref={inputceo}
                onChange={handleUpload2}
              />
            </div>
          </Grid>
        </Grid>
        <AddContentBtns add={addContent} btnstate={isEmpty} />
      </Container>
    </>
  );
};

export default AddFarmer;
