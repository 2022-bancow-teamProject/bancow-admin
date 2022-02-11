import Container from "@mui/material/Container";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "번호", width: 70 },
  { field: "title", headerName: "제목", width: 400 },
  { field: "start_date", headerName: "생성일", width: 150 },
  { field: "end_date", headerName: "마감일", width: 150 }
];

const rows = [
  {
    id: 1,
    title: "내 소의 출하 일정과 등급 판정 결과 확인",
    start_date: "2019-01-12",
    end_date: "2019-01-13"
  },
  {
    id: 1,
    title: "내 소의 출하 일정과 등급 판정 결과 확인",
    start_date: "2019-01-12",
    end_date: "2019-01-13"
  },
  {
    id: 1,
    title: "내 소의 출하 일정과 등급 판정 결과 확인",
    start_date: "2019-01-12",
    end_date: "2019-01-13"
  },
  {
    id: 1,
    title: "내 소의 출하 일정과 등급 판정 결과 확인",
    start_date: "2019-01-12",
    end_date: "2019-01-13"
  },
  {
    id: 1,
    title: "내 소의 출하 일정과 등급 판정 결과 확인",
    start_date: "2019-01-12",
    end_date: "2019-01-13"
  },
  {
    id: 1,
    title: "내 소의 출하 일정과 등급 판정 결과 확인",
    start_date: "2019-01-12",
    end_date: "2019-01-13"
  },
  {
    id: 1,
    title: "내 소의 출하 일정과 등급 판정 결과 확인",
    start_date: "2019-01-12",
    end_date: "2019-01-13"
  },
  {
    id: 1,
    title: "내 소의 출하 일정과 등급 판정 결과 확인",
    start_date: "2019-01-12",
    end_date: "2019-01-13"
  },
  {
    id: 1,
    title: "내 소의 출하 일정과 등급 판정 결과 확인",
    start_date: "2019-01-12",
    end_date: "2019-01-13"
  }
];

const PopUp = () => {
  return (
    <Container component="main">
      <h1>팝업</h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Container>
  );
};

export default PopUp;
