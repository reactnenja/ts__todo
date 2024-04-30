import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./assets/pages/Home";
import { AuthContext } from "./assets/context/SliceContext";

const App = () => {
  return (
    <Router>
      <Routes>
        <AuthContext.Provider value={{ email: "", password: "" }}>
          <Route path="/" element={<Login />} />
        </AuthContext.Provider>
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
