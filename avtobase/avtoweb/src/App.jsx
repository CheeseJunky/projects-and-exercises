import { Route, Routes } from "react-router-dom";
import { Home } from "./screens/home";
import { Admin } from "./screens/admin";
import { Navbar } from "./components/navbar";

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/admin' element={<Admin />} />
    </Routes>
    </>
  );
};

export default App;
