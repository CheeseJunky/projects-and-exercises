import { Route, Routes } from "react-router-dom";
import { Helmet } from 'react-helmet';

import { Navbar } from "./components/navbar";
import { Home } from "./screens/home";
import { Admin } from "./screens/admin";
import { DetailedScreen } from "./screens/detailed_screen";
import { DataProviders } from "./store/data-provider";
import LoginScreen from "./screens/login";

const App = () => {
  return (
    <>
      <Helmet>
        <title>Avtoweb</title>
        <meta name="description" content="Avto.net like application"></meta>
      </Helmet>
      <Navbar />
      <DataProviders>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/details' element={<DetailedScreen />} />
          <Route path='/login' element={<LoginScreen />} />
        </Routes>
      </DataProviders>
    </>
  );
};

export default App;
