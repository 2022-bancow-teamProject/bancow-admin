import { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import GridItem from "../../components/gridtable/GTItem";
import GTselector from "../../components/gridtable/GTselector";
import { FarmQnaDetail, getFarmRequestDetail } from "../../api/qna";
import { compareAsc, format } from "date-fns";
import { styled } from "@mui/material/styles";
import Delete from "../../components/button/Delete";
import List from "../../components/button/List";
import { fontWeight } from "@mui/system";
import { Bloodtype } from "@mui/icons-material";

const FarmRequestDetail = () => {
  const [isDelete, setIsDelete] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);
  const [data, setData] = useState<FarmQnaDetail>();
  useEffect(() => {
    (async () => {
      const data = await getFarmRequestDetail(1);
      setData(data);
    })();
    console.log(data?.data.availableDate);
  }, []);

  const handleCheck = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      // 선택됨 목록에 없으면
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

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
        <List></List>
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
      {/* {data?.data.content.map((item) => (
        <Grid
          key={item.id}
          container
          sx={{ height: "40px", marginTop: 0.4, backgroundColor: "#e8e8e8" }}
        >
          {isDelete ? (
            <Grid item xs={1} sx={{ textAlign: "center" }}>
              <Checkbox
                onClick={handleCheck(item.id)}
                checked={checked.indexOf(item.id) !== -1}
                tabIndex={-1}
                disableRipple
              />
            </Grid>
          ) : (
            <GridItem onClick={selectRequest} das={1}>
              {item.id}
            </GridItem>
          )}
          <GridItem das={2}>{item.farmName}</GridItem>
          <GridItem das={1}>{item.farmQnaName}</GridItem>
          <GridItem das={6} id={item.id}>
            {item.checked ? "O" : "X"}
          </GridItem>
          <GridItem das={2}>
            {format(new Date(item.createDate), "yyyy-MM-dd")}
          </GridItem>
        </Grid>
      ))} */}
      {/* <Pagination
        count={data?.data.totalPages}
        onChange={(event, page) => pageNation(page - 1)}
        color="primary"
        size="large"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          bottom: 80
        }}
      /> */}
    </Box>
  );
};

export default FarmRequestDetail;
