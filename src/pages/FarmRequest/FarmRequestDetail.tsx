import { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { FarmQnaDetail, getFarmRequestDetail } from "../../api/qna";
import { styled } from "@mui/material/styles";
import Delete from "../../components/button/Delete";
import List from "../../components/button/List";
import { useNavigate, useParams } from "react-router-dom";

const FarmRequestDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<FarmQnaDetail>();

  useEffect(() => {
    (async () => {
      const data = await getFarmRequestDetail(id);
      setData(data);
    })();
    console.log(data?.data.availableDate);
  }, []);

  const HeaderItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    fontWeight: "bold"
  }));

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }));
  return (
    <Box
      sx={{
        margin: "0 auto",
        width: "80%",
        height: "100%",
        position: "relative"
      }}
    >
      <Typography variant="h4" component="h2">
        문의하기 상세
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          marginTop: 1,
          marginBottom: 8
        }}
      >
        <List func={() => navigate("/manager/admin/qna")}></List>
        <Delete></Delete>
      </Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={2}>
          <HeaderItem>이름</HeaderItem>
        </Grid>
        <Grid item xs={10}>
          <Item>{data?.data.farmQnaName}</Item>
        </Grid>
        <Grid item xs={2}>
          <HeaderItem>휴대전화번호</HeaderItem>
        </Grid>
        <Grid item xs={10}>
          <Item>{data?.data.phoneNumber}</Item>
        </Grid>
        <Grid item xs={2}>
          <HeaderItem>이메일</HeaderItem>
        </Grid>
        <Grid item xs={10}>
          <Item>{data?.data.email}</Item>
        </Grid>
        <Grid item xs={2}>
          <HeaderItem>농가이름</HeaderItem>
        </Grid>
        <Grid item xs={10}>
          <Item>{data?.data.farmName}</Item>
        </Grid>
        <Grid item xs={2}>
          <HeaderItem>농가주소</HeaderItem>
        </Grid>
        <Grid item xs={10}>
          <Item>{data?.data.farmAddress}</Item>
        </Grid>
        <Grid item xs={2}>
          <HeaderItem>사육두수</HeaderItem>
        </Grid>
        <Grid item xs={10}>
          <Item>{data?.data.cowNum}</Item>
        </Grid>
        <Grid item xs={2}>
          <HeaderItem>사용사료</HeaderItem>
        </Grid>
        <Grid item xs={10}>
          <Item>{data?.data.feedName}</Item>
        </Grid>
        <Grid item xs={2}>
          <HeaderItem>실사가능일자</HeaderItem>
        </Grid>
        <Grid item xs={10}>
          <Item>{data?.data.availableDate}</Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FarmRequestDetail;
