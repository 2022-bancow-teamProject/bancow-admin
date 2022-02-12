import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";

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
    id: 2,
    title: "내 소의 출하 일정과 등급 판정 결과 확인",
    start_date: "2019-01-12",
    end_date: "2019-01-13"
  },
  {
    id: 3,
    title: "내 소의 출하 일정과 등급 판정 결과 확인",
    start_date: "2019-01-12",
    end_date: "2019-01-13"
  },
  {
    id: 4,
    title: "내 소의 출하 일정과 등급 판정 결과 확인",
    start_date: "2019-01-12",
    end_date: "2019-01-13"
  },
  {
    id: 5,
    title: "내 소의 출하 일정과 등급 판정 결과 확인",
    start_date: "2019-01-12",
    end_date: "2019-01-13"
  },
  {
    id: 6,
    title: "내 소의 출하 일정과 등급 판정 결과 확인",
    start_date: "2019-01-12",
    end_date: "2019-01-13"
  },
  {
    id: 7,
    title: "내 소의 출하 일정과 등급 판정 결과 확인",
    start_date: "2019-01-12",
    end_date: "2019-01-13"
  },
  {
    id: 8,
    title: "내 소의 출하 일정과 등급 판정 결과 확인",
    start_date: "2019-01-12",
    end_date: "2019-01-13"
  },
  {
    id: 9,
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
      <div style={{ float: "right", marginTop: "40px" }}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button variant="contained" endIcon={<AddIcon />}>
            <Link
              to="/admin/popup/add"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Create
            </Link>
          </Button>
        </Stack>
      </div>
    </Container>
  );
};

export default PopUp;
