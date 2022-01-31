import { Route, Routes } from "react-router-dom";
import IntroPage from "../pages/IntroPage";
import Review from "../pages/Review";
import Farmer from "../pages/Farmer";
import Notice from "../pages/Notice";
import News from "../pages/News";
import Event from "../pages/Event";
import Faq from "../pages/Faq";
import Qna from "../pages/Qna";
import PopUp from "../pages/PopUp";

const MainArea = () => {
  return (
    <main style={{ flexGrow: 1, height: "100vh", padding: "80px 20px 20px" }}>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/review" element={<Review />} />
        <Route path="/farmer" element={<Farmer />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/news" element={<News />} />
        <Route path="/event" element={<Event />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/qna" element={<Qna />} />
        <Route path="/popup" element={<PopUp />} />
      </Routes>
    </main>
  );
};

export default MainArea;
