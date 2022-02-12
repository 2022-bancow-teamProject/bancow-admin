import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { Grid, Box, Typography, Pagination } from "@mui/material";
import GTHeader from "../components/gridtable/GTHeader";
import GridItem from "../components/gridtable/GTItem";
import {
  axiosChangeAuthority,
  axiosGetallmanager,
  Imanager
} from "../api/auth";

const UserList = () => {
  const [totalpage, setTotalpage] = useState(0);
  const [currpage, setCurrpage] = useState(0);
  const [userlist, setUserlist] = useState<Imanager[]>([]);

  const navigate = useNavigate();

  const pageNation = async (page: number) => {
    const data = await axiosGetallmanager(page);
    if (data) {
      setCurrpage(page);
      setUserlist(data.content);
      setTotalpage(data.totalPages);
    }
  };

  const giveAuthority = async (id: number) => {
    const result = await Swal.fire({
      title: "이 계정에 admin권한을 부여 하시겠습니까?",
      confirmButtonText: "권한 부여",
      showCancelButton: true
    });
    if (result.isConfirmed) {
      console.log("dddd");
      const res = await axiosChangeAuthority(id);
      if (res) {
        return pageNation(currpage);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const data = await axiosGetallmanager(0);
      if (!data) {
        return Swal.fire(
          "권한 없음",
          "Super 권한자만 접근 가능 합니다",
          "error"
        ).then(() => {
          navigate("/manager/admin");
        });
      }
      setUserlist(data.content);
      setTotalpage(data.totalPages);
    })();
  }, []);
  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <Typography variant="h4" component="h2" sx={{ marginBottom: "70px" }}>
        관리자 권한 변경
      </Typography>
      <GTHeader>
        <GridItem das={1}>ID</GridItem>
        <GridItem das={3}>Email</GridItem>
        <GridItem das={2}>User name</GridItem>
        <GridItem das={2}>Status</GridItem>
        <GridItem das={2}>Create date</GridItem>
        <GridItem das={2}>Update date</GridItem>
      </GTHeader>
      {userlist.map((item) => (
        <Grid
          key={item.id}
          container
          sx={{
            height: "40px",
            marginTop: 0.5,
            backgroundColor: "#e8e8e8"
          }}
        >
          <GridItem das={1}>{item.id}</GridItem>
          <GridItem das={3} onClick={() => giveAuthority(item.id)}>
            {item.email}
          </GridItem>
          <GridItem das={2}>{item.username}</GridItem>
          <GridItem das={2}>{item.managerStatus}</GridItem>
          <GridItem das={2}>
            {format(new Date(item.createDate), "yyyy.MM.dd")}
          </GridItem>
          <GridItem das={2}>
            {format(new Date(item.updateDate), "yyyy.MM.dd HH:MM")}
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

export default UserList;
