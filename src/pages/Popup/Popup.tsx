import { useState, useEffect } from "react";
import { getPopupRequest, getPopupResponse } from "../../api/popup";
import Container from "@mui/material/Container";
import { Box, Checkbox, Grid, Pagination, Typography } from "@mui/material";
import GridItem from "../../components/gridtable/GTItem";
import GTselector from "../../components/gridtable/GTselector";
import GTHeader from "../../components/gridtable/GTHeader";

const PopUp = () => {
  const [isDelete, setIsDelete] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);
  const [data, setData] = useState<getPopupResponse>();

  useEffect(() => {
    (async () => {
      const data = await getPopupRequest(0);
      setData(data);
    })();
  }, []);

  const pageNation = async (page: number) => {
    const data = await getPopupRequest(page);
    if (data) {
      setData(data);
    }
  };

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

  const selectRequest = () => {
    console.log("y");
  };

  return (
    <Container component="main">
      <Box sx={{ height: "100%", position: "relative" }}>
        <Typography variant="h4" component="h2">
          팝업 목록
        </Typography>
        <GTHeader>
          <GridItem das={1}>번호</GridItem>
          <GridItem das={6}>제목</GridItem>
          <GridItem das={2}>생성일</GridItem>
          <GridItem das={2}>마감일</GridItem>
        </GTHeader>

        {data?.data.content.map((item) => (
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
              <GridItem das={1}>{item.id + 1}</GridItem>
            )}
            <GridItem das={6}>{item.title}</GridItem>
            <GridItem das={2}>{item.start_date}</GridItem>
            <GridItem das={2}>{item.end_date}</GridItem>
          </Grid>
        ))}
        <Pagination
          count={data?.data.totalPages}
          onChange={(event, page) => pageNation(page - 1)}
          color="primary"
          size="large"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            bottom: "-60px"
          }}
        />
      </Box>
      <GTselector
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        checked={checked}
        setChecked={setChecked}
      />
    </Container>
  );
};

export default PopUp;
