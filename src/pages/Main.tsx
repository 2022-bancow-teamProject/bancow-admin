import { useState } from "react";
import TopAppBar from "../components/TopAppBar";
import LeftGNB from "../components/LeftGNB";
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
