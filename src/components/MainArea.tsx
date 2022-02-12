import { Route, Routes } from "react-router-dom";
import IntroPage from "../pages/IntroPage";
import Review from "../pages/Review/Review";
import Farmer from "../pages/Farmer";
import Notice from "../pages/Notice";
import News from "../pages/News";
import Event from "../pages/Event";
import Faq from "../pages/Faq";
import Qna from "../pages/Qna";
import Popup from "../pages/Popup/Popup";
import AddPopup from "../pages/Popup/AddPopup";
import AddReview from "../pages/Review/AddReview";
import EditReview from "../pages/Review/EditReview";
import Mypage from "../pages/Mypage";

const MainArea = () => {
  return (
    <main style={{ flexGrow: 1, height: "100vh", padding: "80px 20px 20px" }}>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="/review" element={<Review />} />
        <Route path="/review/add" element={<AddReview />} />
        <Route path="/review/:id" element={<EditReview />} />
        <Route path="/farmer" element={<Farmer />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/news" element={<News />} />
        <Route path="/event" element={<Event />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/qna" element={<Qna />} />
        <Route path="/popup" element={<Popup />} />
        <Route path="/popup/add" element={<AddPopup />} />
      </Routes>
    </main>
  );
};

export default MainArea;
