import { Box, Checkbox, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Add from "../components/button/Add";
import Cancel from "../components/button/Cancel";
import Delete from "../components/button/Delete";
import Select from "../components/button/Select";
import GridItem from "../components/gridtable/GridItem";

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

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  console.log(checked);
  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <Typography variant="h4" component="h2">
        메인 페이지 Review 관리
      </Typography>
      <Box
        sx={{
          height: 50,
          marginTop: 1,
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <Add />
        {isDelete && <Delete setIsDelete={setIsDelete} />}
        {isDelete ? (
          <Cancel setIsDelete={setIsDelete} />
        ) : (
          <Select setIsDelete={setIsDelete} />
        )}
      </Box>
      <Grid
        container
        sx={{ height: "40px", marginTop: 2, backgroundColor: "#b2bec3" }}
      >
        <GridItem das={1}>번호</GridItem>
        <GridItem das={2}>농가</GridItem>
        <GridItem das={1}>호</GridItem>
        <GridItem das={6}>리뷰</GridItem>
        <GridItem das={2}>구매자</GridItem>
      </Grid>

      {data.map((item) => (
        <Grid
          key={item.index}
          container
          sx={{ height: "40px", marginTop: 0.4, backgroundColor: "#e8e8e8" }}
        >
          {isDelete ? (
            <Grid item xs={1} sx={{ textAlign: "center" }}>
              <Checkbox
                onClick={handleToggle(item.index)}
                checked={checked.indexOf(item.index) !== -1}
                tabIndex={-1}
                disableRipple
              />
            </Grid>
          ) : (
            <GridItem das={1}>{item.index}</GridItem>
          )}
          <GridItem das={2}>{item.farm}</GridItem>
          <GridItem das={1}>{item.number}</GridItem>
          <GridItem das={6}>{item.review}</GridItem>
          <GridItem das={2}>{item.name}</GridItem>
        </Grid>
      ))}
    </Box>
  );
};

export default Review;
