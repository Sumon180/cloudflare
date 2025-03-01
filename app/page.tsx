import React from "react";
import NestedCard01 from "./Components/NestedCard01";
import NestedCard02 from "./Components/NestedCard02";

export const runtime = "edge";

const Home = () => {
  return (
    <div>
      <NestedCard01 />
      <NestedCard02 />
    </div>
  );
};

export default Home;
