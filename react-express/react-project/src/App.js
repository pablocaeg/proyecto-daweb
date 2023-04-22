import { Route, Routes, Link } from "react-router-dom"

import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Contact from "./pages/Contact/Contact";

const App = () => {
  return (
    <>
      <Header />
      <nav>
        <ul>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <main>
        <div class="test"></div>
      </main>
      <Footer />
      <Routes>
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;
