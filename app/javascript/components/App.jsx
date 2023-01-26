import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import Login from "../pages/Login";
import Projects from "../pages/Projects";
import NotFound from "../pages/NotFound";


const App = () => {
  console.log("Vite");
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/projects/" element={<Projects />} />
        <Route path="/projects/:id" element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
