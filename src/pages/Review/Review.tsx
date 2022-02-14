import { useEffect, useState } from "react";
import { Box, Checkbox, Grid, Pagination, Typography } from "@mui/material";
import GridItem from "../../components/gridtable/GTItem";
import GTHeader from "../../components/gridtable/GTHeader";
import GTdeletor from "../../components/gridtable/GTdeletor";
import {
  axiosEditStatus,
  axiosGetReview,
  axiosRemoveOneReview,
  axiosRemoveReviews,
  Ireview
} from "../../api/reviewer";
import { format } from "date-fns";
import Swal from "sweetalert2";

const Review = () => {
  const [isDelete, setIsDelete] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);

  const [list, setList] = useState<Ireview[]>([]);
  const [currpage, setCurrpage] = useState(0);
  const [totalpage, setTotalpage] = useState(0);

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

  const pageNation = async (page: number) => {
    const data = await axiosGetReview(page);
    if (data) {
      setCurrpage(page);
      setList(data.content);
      setTotalpage(data.totalPages);
    }
  };

  const changeStatus = async (id: number, status: boolean) => {
    const res = await axiosEditStatus({ id, status: !status });
    if (res) {
      pageNation(currpage);
    }
  };

  const deleteReview = async () => {
    if (!checked.length) return;
    let res;
    if (1 === checked.length) {
      res = await axiosRemoveOneReview(checked[0]);
    } else {
      res = await axiosRemoveReviews(checked);
    }
    if (res) {
      Swal.fire("삭제 완료", "리뷰 삭제가 완료되었습니다.", "success");
      const data = await axiosGetReview(currpage);
      if (data) {
        setList(data.content);
        setTotalpage(data.totalPages);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "삭제 실패",
        text: "리뷰 삭제를 실패하였습니다."
      });
    }
  };

  useEffect(() => {
    (async () => {
      const data = await axiosGetReview(0);
      if (data) {
        setList(data.content);
        setTotalpage(data.totalPages);
      }
    })();
  }, []);

  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <Typography variant="h4" component="h2">
        Review 배포 관리
      </Typography>
      <GTdeletor
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        setChecked={setChecked}
        delfunc={deleteReview}
      />
      <GTHeader>
        <GridItem das={1}>ID</GridItem>
        <GridItem das={1}>구매자</GridItem>
        <GridItem das={1}>Status</GridItem>
        <GridItem das={2}>농가명</GridItem>
        <GridItem das={5}>Title</GridItem>
        <GridItem das={2}>Create date</GridItem>
      </GTHeader>

      {list.map((item) => (
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
            <GridItem das={1}>{item.id}</GridItem>
          )}
          <GridItem das={1}>{item.buyer_name}</GridItem>
          <GridItem das={1} onClick={() => changeStatus(item.id, item.status)}>
            {item.status ? "공개" : "비공개"}
          </GridItem>
          <GridItem das={2}>{item.farm_name}</GridItem>
          <GridItem das={5} id={item.id}>
            {item.title}
          </GridItem>
          <GridItem das={2}>
            {format(new Date(item.create_date), "yyyy.MM.dd HH:MM")}
          </GridItem>
        </Grid>
      ))}
      <Pagination
        count={totalpage}
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

export default Review;
