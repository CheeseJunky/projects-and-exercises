import { Link as RouterLink, Route, Routes } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { Box, Button, Container, Typography } from "@mui/material";

import { Navbar } from "./components/navbar";
import { Home } from "./screens/home";
import { Admin } from "./screens/admin";
import { DetailedScreen } from "./screens/detailed_screen";
import { DataProviders } from "./store/data-provider";
import LoginScreen from "./screens/login";

const NotFound = () => (
  <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
    <Typography variant="h4" gutterBottom>Page not found</Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>
      The page you were looking for does not exist.
    </Typography>
    <Button variant="contained" component={RouterLink} to="/">Back to the list</Button>
  </Container>
);

const App = () => {
  return (
    // Navbar moved inside the providers so it can show who is signed in.
    <DataProviders>
      <Helmet>
        <title>Avtoweb</title>
        <meta name="description" content="Avto.net like application" />
      </Helmet>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/details' element={<DetailedScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Box>
    </DataProviders>
  );
};

export default App;
