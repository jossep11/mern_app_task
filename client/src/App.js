import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import CreateNotes from "./components/CreateNotes";
import CreateUser from "./components/CreateUser";
import Notelist from "./components/Notelist";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <div className="container p-4">
          <Routes>
            <Route exact path={"/"} element={<Notelist />} />
            <Route exact path={"/create"} element={<CreateNotes />} />
            <Route exact path={"/edit/:id"} element={<CreateNotes />} />
            <Route exact path={"/user"} element={<CreateUser />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
