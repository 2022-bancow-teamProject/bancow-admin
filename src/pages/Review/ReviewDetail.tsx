import { Container, Grid, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosGetReviewDetail, reviewDetail } from "../../api/reviewer";
import { format } from "date-fns";
import Cancel from "../../components/button/Cancel";

const ReviewDetail = () => {
  const [item, setItem] = useState<reviewDetail>();

  const navigation = useNavigate();
  const { pathname } = useLocation();
  const id = pathname.split("review/")[1];

  const cancel = () => {
    navigation(-1);
  };

  useEffect(() => {
    (async () => {
      const data = await axiosGetReviewDetail(id);
      if (data) {
        setItem(data);
      }
    })();
  }, []);
  return (
    <>
      <Typography variant="h4" component="h2">
        리뷰 상세 정보
      </Typography>
      <Container
        maxWidth="sm"
        sx={{ marginTop: 5, height: "700px", overflowY: "auto" }}
      >
        <Grid container sx={{ marginBottom: 5 }}>
          <Typography variant="h6" component="h2">
            농장 이름
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Typography>{item?.farm_name ? "공개" : "비공개"}</Typography>
          </Grid>
          <Typography variant="h6" component="h2">
            제목
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Typography>{item?.title}</Typography>
          </Grid>
          <Typography variant="h6" component="h2">
            내용
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Typography>{item?.content}</Typography>
          </Grid>
          <Typography variant="h6" component="h2">
            상태
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Typography>{item?.status ? "공개" : "비공개"}</Typography>
          </Grid>
          <Typography variant="h6" component="h2">
            구매자 이름
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Typography>{item?.buyer_name}</Typography>
          </Grid>
          <Typography variant="h6" component="h2">
            작성자
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Typography>{item?.user_name}</Typography>
          </Grid>
          <Typography variant="h6" component="h2">
            생성일
          </Typography>
          <Grid item xs={12} sx={{ marginBottom: 3 }}>
            <Typography>
              {item && format(new Date(item.create_date), "yyyy.MM.dd HH:MM")}
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            height: 50,
            marginTop: 1,
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Cancel func={cancel} />
        </Box>
      </Container>
    </>
  );
};

export default ReviewDetail;
