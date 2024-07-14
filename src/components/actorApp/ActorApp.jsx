import { Routes, Route } from "react-router-dom";
import ActorForm from "../actor/ActorForm";
import ActorList from "../actor/ActorList";

import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Home from "../pages/Home";
import ActorDelete from "../actor/ActorDelete";
import { Container, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#834bff",
      main: "#651fff",
      dark: "#4615b2",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f73378",
      main: "#f50057",
      dark: "#ab003c",
      contrastText: "#fff",
    },
    ternary: {
      light: "#af52bf",
      main: "#9c27b0",
      dark: "#6d1b7b",
      contrastText: "#fff",
    },
    dark: {
      main: "#000",
    },
  },
});

/**
 * It is the main component of the application
 */

const ActorApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actors" element={<ActorList />} />
          <Route path="/actors/new" element={<ActorForm title="Nuevo" />} />
          <Route
            path="/actors/update/:_id"
            element={<ActorForm title="Editar" />}
          />
          <Route path="/actors/delete/:_id" element={<ActorDelete />} />
        </Routes>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default ActorApp;
