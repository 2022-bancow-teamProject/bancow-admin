import { useEffect, useState } from "react";
import { Box, Checkbox, Grid, Pagination, Typography } from "@mui/material";
import GridItem from "../../components/gridtable/GTItem";
import GTselector from "../../components/gridtable/GTselector";
import GTHeader from "../../components/gridtable/GTHeader";
import {
  deleteFarmRequest,
  FarmQnaResponse,
  getFarmRequest
} from "../../api/qna";
import { format } from "date-fns";

const Qna = () => {
  const [isDelete, setIsDelete] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);
  const [data, setData] = useState<FarmQnaResponse>();
  useEffect(() => {
    (async () => {
      const data = await getFarmRequest(0);
      setData(data);
    })();
  }, []);

  const pageNation = async (page: number) => {
    const data = await getFarmRequest(page);
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
    console.log("k");
  };

  // QNA 목록 선택 삭제
  const deleteQna = async () => {
    await deleteFarmRequest({ id: checked });
  };

  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <Typography variant="h4" component="h2">
        농가입점
      </Typography>
      <GTselector
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        checked={checked}
        setChecked={setChecked}
      />
      <GTHeader>
        <GridItem das={1}>번호</GridItem>
        <GridItem das={2}>농가 이름</GridItem>
        <GridItem das={1}>이름</GridItem>
        <GridItem das={6}>확인유무</GridItem>
        <GridItem das={2}>등록일</GridItem>
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
          bottom: 80
        }}
      />
    </Box>
  );
};

export default Qna;
