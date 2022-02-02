import { useState } from "react";
import TopAppBar from "../components/layout/TopAppBar";
import LeftGNB from "../components/layout/LeftGNB";
import MainArea from "../components/MainArea";

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TopAppBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <LeftGNB isOpen={isOpen} setIsOpen={setIsOpen} />
      <MainArea />
    </>
  );
};

export default Main;
