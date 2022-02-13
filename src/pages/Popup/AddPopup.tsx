import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { Box, Checkbox, Grid, Pagination, Typography } from "@mui/material";
import GridItem from "../../components/gridtable/GTItem";
import GTselector from "../../components/gridtable/GTselector";
import GTHeader from "../../components/gridtable/GTHeader";
import Button from "@mui/material/Button";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";

const AddPopup = () => {
  return (
    <Container component="main">
      <Typography variant="h4" component="h2">
        팝업 추가
      </Typography>
      <div style={{ float: "right", marginTop: "40px" }}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<ListAltIcon />}>
            <Link
              to="/manager/admin/popup"
              style={{ textDecoration: "none", color: "#556cd6" }}
            >
              목록
            </Link>
          </Button>
          <Button variant="contained" endIcon={<AddIcon />}>
            추가
          </Button>
        </Stack>
      </div>
    </Container>
  );
};

export default AddPopup;
