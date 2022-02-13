import { useEffect, useState } from "react";
import { Grid, Box, Typography, Pagination } from "@mui/material";
import GTHeader from "../../components/gridtable/GTHeader";
import GridItem from "../../components/gridtable/GTItem";
import GTselector from "../../components/gridtable/GTselector";
// 제거
import { Imanager } from "../../api/auth";
import { axiosAddEvent, axiostest } from "../../api/event";

const Event = () => {
  const [isDelete, setIsDelete] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);

  const [userlist, setUserlist] = useState<Imanager[]>([]);
  const [file, setFiles] = useState<File>();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files) {
      setFiles(files[0]);
    }
  };

  const testapi = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("event_image", file as Blob);
    formData.append(
      "event_request",
      new Blob(
        [
          JSON.stringify({
            title: "test입니다",
            start_date: "2023-01-01",
            end_date: "2025-01-01"
          })
        ],
        { type: "application/json" }
      )
    );

    const res = await axiosAddEvent(formData);
    console.log(res);
  };
  useEffect(() => {
    (async () => {
      const res = await axiostest();
      console.log(res);
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
        checked={checked}
        setChecked={setChecked}
      />
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
          <GridItem das={3}>{item.email}</GridItem>
          <GridItem das={2}>{item.username}</GridItem>
          <GridItem das={2}>{item.managerStatus}</GridItem>
        </Grid>
      ))}
      <form encType="multipart/form-data" onSubmit={testapi}>
        <input type="file" name="photo" onChange={handleUpload} />
        <button type="submit">fsfasfsa</button>
      </form>
      {/* <Pagination
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
      /> */}
    </Box>
  );
};

export default Event;
