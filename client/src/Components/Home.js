import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Header />

      <div className="content" style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
