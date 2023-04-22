import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import * as React from "react";
import Header from "./layouts/Header";
import Registration from "./pages/Registration/Registration";
import Content from "./pages/content/Content";
import SignIn from "./components/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/registration" exact element={<Registration />}></Route>
        <Route path="/content" exact element={<Content />}></Route>
        <Route path="/login" exact element={<SignIn />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
