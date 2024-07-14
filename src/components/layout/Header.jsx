import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

/**
 * Displays the application header
 */

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Actors Application
          </Typography>
          <Button color="inherit" LinkComponent={Link} to="/">
            Home
          </Button>
          <Button color="inherit" LinkComponent={Link} to="/actors">
            List
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
