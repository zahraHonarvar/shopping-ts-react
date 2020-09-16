import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }: any) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
export default Layout;
