import { useEffect, useState } from "react";
import { Grid, Box, Typography, Pagination, Checkbox } from "@mui/material";
import GTHeader from "../../components/gridtable/GTHeader";
import GridItem from "../../components/gridtable/GTItem";
import GTselector from "../../components/gridtable/GTselector";
import {
  axiosGetAllEvent,
  axiosRemoveEvents,
  axiosRemoveOneEvent,
  Ievent
} from "../../api/event";
import { format } from "date-fns";
import Swal from "sweetalert2";

const Event = () => {
  const [isDelete, setIsDelete] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);

  const [totalpage, setTotalpage] = useState(0);

  const [eventlist, setEventlist] = useState<Ievent[]>([]);

  const handleCheck = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    // 목록에 없으면
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const pageNation = async (page: number) => {
    const data = await axiosGetAllEvent(page);
    if (data) {
      setEventlist(data.content);
      setTotalpage(data.totalPages);
    }
  };

  const deleteEvent = async () => {
    if (!checked.length) return;
    let res;
    if (1 === checked.length) {
      res = await axiosRemoveOneEvent(checked[0]);
    } else {
      res = await axiosRemoveEvents(checked);
    }
    if (res) {
      Swal.fire("삭제 완료", "이벤트 삭제가 완료되었습니다.", "success");
      const data = await axiosGetAllEvent(0);
      if (data) {
        setEventlist(data.content);
        setTotalpage(data.totalPages);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "삭제 실패",
        text: "이벤트 삭제를 실패하였습니다."
      });
    }
  };

  useEffect(() => {
    (async () => {
      const data = await axiosGetAllEvent(0);
      if (data) {
        setEventlist(data.content);
        setTotalpage(data.totalPages);
      }
    })();
  }, []);

  return (
    <Box sx={{ height: "100%", position: "relative" }}>
      <Typography variant="h4" component="h2">
        이벤트 관리
      </Typography>
      <GTselector
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        setChecked={setChecked}
        delfunc={deleteEvent}
      />
      <GTHeader>
        <GridItem das={1}>ID</GridItem>
        <GridItem das={4}>Title</GridItem>
        <GridItem das={1}>Status</GridItem>
        <GridItem das={3}>Event Period</GridItem>
        <GridItem das={1}>User name</GridItem>
        <GridItem das={2}>Create date</GridItem>
      </GTHeader>
      {eventlist.map((item) => (
        <Grid
          key={item.id}
          container
          sx={{
            height: "40px",
            marginTop: 0.5,
            backgroundColor: "#e8e8e8"
          }}
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
          <GridItem das={4} id={item.id}>
            {item.title}
          </GridItem>
          <GridItem das={1}>{`${item.status}`}</GridItem>
          <GridItem das={3}>{`${item.start_date} ~ ${item.end_date}`}</GridItem>
          <GridItem das={1}>{item.user_name}</GridItem>
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

export default Event;
