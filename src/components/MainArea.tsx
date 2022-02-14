import { Route, Routes } from "react-router-dom";
import IntroPage from "../pages/IntroPage";
import Review from "../pages/Review/Review";
import Farmer from "../pages/Farmer/Farmer";
import Notice from "../pages/Notice";
import News from "../pages/News";
import Event from "../pages/Event/Event";
import Faq from "../pages/Faq";
import Popup from "../pages/Popup/Popup";
import AddPopup from "../pages/Popup/AddPopup";
import Qna from "../pages/FarmRequest/Qna";
import AddReview from "../pages/Review/AddReview";
import EditReview from "../pages/Review/EditReview";
import Mypage from "../pages/Mypage";
import UserList from "../pages/UserList";
import FarmRequestDetail from "../pages/FarmRequest/FarmRequestDetail";
import AddEvent from "../pages/Event/AddEvent";
import EditEvent from "../pages/Event/EditEvent";
import EditFarmer from "../pages/Farmer/EditFarmer";
import AddFarmer from "../pages/Farmer/AddFarmer";

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
        <Route path="/farmer/add" element={<AddFarmer />} />
        <Route path="/farmer/:id" element={<EditFarmer />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/news" element={<News />} />
        <Route path="/event" element={<Event />} />
        <Route path="/event/add" element={<AddEvent />} />
        <Route path="/event/:id" element={<EditEvent />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/qna" element={<Qna />} />
        <Route path="/popup" element={<Popup />} />
        <Route path="/popup/add" element={<AddPopup />} />
        <Route path="/qna/:id" element={<FarmRequestDetail />} />
        <Route path="/userlist" element={<UserList />} />
      </Routes>
    </main>
  );
};

export default MainArea;
