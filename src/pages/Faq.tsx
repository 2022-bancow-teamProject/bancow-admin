import { useEffect, useState } from "react";
import { Box, Checkbox, Grid, Pagination, Typography } from "@mui/material";
import GridItem from "../components/gridtable/GTItem";
import GTselector from "../components/gridtable/GTselector";
import GTHeader from "../components/gridtable/GTHeader";
import { getFarmRequest } from "../api/qna";

const data = [
  {
    index: 0,
    category: "구매하기",
    question: "구매 금액은 어떻게 지불하나요?",
    answer: "보유하고 계신 예치금에서 구매하신.",
    date: "22.2.10"
  },
  {
    index: 1,
    category: "구매하기",
    question: "구매 금액은 어떻게 지불하나요?",
    answer: "보유하고 계신 예치금에서 구매하신",
    date: "22.2.10"
  },
  {
    index: 2,
    category: "구매하기",
    question: "구매 금액은 어떻게 지불하나요ㅋ?",
    answer: "보유하고 계신 예치금에서 구매하신",
    date: "22.2.10"
  }
];

const Faq = () => {
  const [isDelete, setIsDelete] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);

  useEffect(() => {
    getFarmRequest(1);
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

  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <Typography variant="h4" component="h2">
        자주묻는 질문
      </Typography>
      <GTselector
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        checked={checked}
        setChecked={setChecked}
      />
      <GTHeader>
        <GridItem das={1}>번호</GridItem>
        <GridItem das={2}>카테고리</GridItem>
        <GridItem das={1}>질문</GridItem>
        <GridItem das={6}>답변</GridItem>
        <GridItem das={2}>등록일</GridItem>
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
          <GridItem das={2}>{item.category}</GridItem>
          <GridItem das={1}>{item.question}</GridItem>
          <GridItem das={6} id={item.index}>
            {item.answer}
          </GridItem>
          <GridItem das={2}>{item.date}</GridItem>
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

export default Faq;
