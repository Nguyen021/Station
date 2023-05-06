import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import { useReducer } from "react";
import reducerUser from "./reducers/ReducerUser";
import { ContextUser } from "./configs/ContextUser";
import { Container } from "react-bootstrap";
import cookie from "react-cookies";
import Home from "./components/Home";
import TripDetail from "./components/TripDetail";
import Comming from "./layouts/Comming";
import "moment/locale/vi";
import moment from "moment";
import StationDetail from "./components/StationDetail";
import StationMange from "./components/StationMange";

moment().local("vi");
function App() {
  const [user, dispatch] = useReducer(
    reducerUser,
    cookie.load("current-user") || null
  );

  return (
    <ContextUser.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/detail/:tripId" element={<TripDetail />} />
            <Route
              path="/detail-station/:stationId"
              element={<StationDetail />}
            />
            <Route path="/manage-station/" element={<StationMange />} />
            <Route path="*" element={<Comming />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </ContextUser.Provider>
  );
}

export default App;
