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
  axiosEditFarmnoimg,
  axiosEditFarmwidthimg,
  axiosGetFarmDetail
} from "../../api/farm";
import { format } from "date-fns";
import AddContentBtns from "../../components/button/AddContentBtns";
import Swal from "sweetalert2";

const EditFarmer = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);
  const [farm_name, setFarmname] = useState("");
  const [ceo_name, setCeoname] = useState("");
  const [content, setContent] = useState("");
  const [filefarm, setFilesfarm] = useState<File | string>("");
  const [fileceo, setFilesceo] = useState<File | string>("");
  const [username, setUsername] = useState("");
  const [createdate, setCreatedate] = useState("");

  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (title && farm_name && ceo_name && content) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [title, farm_name, ceo_name, content]);

  const inputfarm = useRef<HTMLInputElement>(null);
  const inputceo = useRef<HTMLInputElement>(null);

  const { pathname } = useLocation();
  const id = pathname.split("farmer/")[1];

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

  const editInfo = async () => {
    let res;
    if (filefarm && fileceo) {
      const formData = new FormData();
      formData.append("farm_image", filefarm as Blob);
      formData.append("farm_ceo_image", fileceo as Blob);
      formData.append(
        "farm_request",
        new Blob(
          [
            JSON.stringify({
              id: +id,
              farm_name,
              ceo_name,
              title,
              content,
              status
            })
          ],
          { type: "application/json" }
        )
      );

      res = await axiosEditFarmwidthimg(formData);
    } else {
      res = await axiosEditFarmnoimg({
        id: +id,
        farm_name,
        ceo_name,
        title,
        content,
        status
      });
    }
    if (res) {
      Swal.fire(
        "수정 완료",
        "농가 정보 수정이 완료되었습니다.",
        "success"
      ).then(() => {
        navigate(-1);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "수정 실패",
        text: "농가정보 수정이 실패하였습니다."
      });
    }
  };

  useEffect(() => {
    (async () => {
      const data = await axiosGetFarmDetail(id);
      if (data) {
        setTitle(data.title);
        setContent(data.content);
        setFarmname(data.farm_name);
        setCeoname(data.ceo_name);
        setStatus(data.status);
        setUsername(data.user_name);
        setCreatedate(data.create_date);
        setFilesfarm(data.farm_image);
        setFilesceo(data.farm_ceo_image);
      }
    })();
  }, []);

  return (
    <>
      <Typography variant="h4" component="h2">
        농가 정보 상세 / 수정
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

          <Typography variant="h6" component="h2">
            상태
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Button
              variant="contained"
              color={status ? "success" : "error"}
              sx={{
                height: "40px",
                width: "120px",
                marginTop: 2,
                marginRight: 3,
                pointerEvents: "none"
              }}
            >
              {status ? "입점 완료" : "미완료"}
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
        <AddContentBtns add={editInfo} btnstate={isEmpty} editform />
      </Container>
    </>
  );
};

export default EditFarmer;
