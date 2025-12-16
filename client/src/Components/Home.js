import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* الهيدر دائمًا أعلى الصفحة */}
      <Header />

      {/* هذا المكان لعرض أي صفحة مختارة */}
      <div className="content" style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
