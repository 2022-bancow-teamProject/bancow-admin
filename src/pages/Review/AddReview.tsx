import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import AddContentBtns from "../../components/button/AddContentBtns";

const AddReview = () => {
  return (
    <>
      <Typography variant="h4" component="h2">
        Review 추가 등록
      </Typography>
      <Container maxWidth="sm" sx={{ marginTop: 3.5 }}>
        <Grid container spacing={3} sx={{ marginBottom: 5 }}>
          <Grid item xs={12} md={8}>
            <TextField
              required
              id="farmName"
              label="농가명"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              required
              id="farmNumber"
              label="호"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="review"
              label="리뷰 내용"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="user"
              label="구매자"
              fullWidth
              variant="standard"
            />
          </Grid>
        </Grid>
        <AddContentBtns />
      </Container>
    </>
  );
};

export default AddReview;
