import { Route, Routes} from "react-router-dom"

import React from "react";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Contact from "./pages/Contact/Contact.js";
import Landing from "./pages/Landing/Landing.js";

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
