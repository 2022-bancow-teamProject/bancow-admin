import { useState } from "react";
import { Box, Checkbox, Grid, Pagination, Typography } from "@mui/material";
import GridItem from "../../components/gridtable/GTItem";
import GTselector from "../../components/gridtable/GTselector";
import GTHeader from "../../components/gridtable/GTHeader";

const data = [
  {
    index: 0,
    farm: "대흥진목장",
    number: 11,
    review:
      "주변에 한우목장들이 있어 산업이 유망하다고 알고는 있었는데, 저 같은 일반 투자자도 이제 투자가 가능해졌네요.",
    name: "정말로"
  },
  {
    index: 1,
    farm: "대흥진목장",
    number: 14,
    review:
      "주변에 한우목장들이 있어 산업이 유망하다고 알고는 있었는데, 저 같은 일반 투자자도 이제 투자가 가능해졌네요.",
    name: "안정말"
  },
  {
    index: 2,
    farm: "대흥진목장",
    number: 20,
    review:
      "주변에 한우목장들이 있어 산업이 유망하다고 알고는 있었는데, 저 같은 일반 투자자도 이제 투자가 가능해졌네요.",
    name: "말안정"
  }
];

const Review = () => {
  const [isDelete, setIsDelete] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);

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

  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <Typography variant="h4" component="h2">
        메인 페이지 Review 관리
      </Typography>
      <GTselector
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        checked={checked}
        setChecked={setChecked}
      />
      <GTHeader>
        <GridItem das={1}>번호</GridItem>
        <GridItem das={2}>농가</GridItem>
        <GridItem das={1}>호</GridItem>
        <GridItem das={6}>리뷰</GridItem>
        <GridItem das={2}>구매자</GridItem>
      </GTHeader>

      {data.map((item) => (
        <Grid
          key={item.index}
          container
          sx={{ height: "40px", marginTop: 0.4, backgroundColor: "#e8e8e8" }}
        >
          {isDelete ? (
            <Grid item xs={1} sx={{ textAlign: "center" }}>
              <Checkbox
                onClick={handleCheck(item.index)}
                checked={checked.indexOf(item.index) !== -1}
                tabIndex={-1}
                disableRipple
              />
            </Grid>
          ) : (
            <GridItem das={1}>{item.index + 1}</GridItem>
          )}
          <GridItem das={2}>{item.farm}</GridItem>
          <GridItem das={1}>{item.number}</GridItem>
          <GridItem das={6}>{item.review}</GridItem>
          <GridItem das={2}>{item.name}</GridItem>
        </Grid>
      ))}
      <Pagination
        count={10}
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
