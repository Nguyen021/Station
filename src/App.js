import React, { useReducer } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { UserContext } from "./contexts/UserContext";
import reducerForUser from "./reducers/ReducerForUser";
function App() {
  const [user, dispatch] = useReducer(reducerForUser, null);
  return (
    <UserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <Header />

        <MDBContainer>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Signin />}></Route>
            <Route path="/register" element={<Signup />}></Route>
          </Routes>
        </MDBContainer>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
