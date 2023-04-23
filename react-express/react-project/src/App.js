import { Route, Routes} from "react-router-dom"

import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Contact from "./pages/Contact/Contact";
import Landing from "./pages/Landing/Landing";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
