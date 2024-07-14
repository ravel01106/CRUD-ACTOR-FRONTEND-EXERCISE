/* eslint-disable camelcase */
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";

import Loader from "../loader/Loader";
import Message from "../message/Message";
import ActorService from "../../services/actor.service";
import styled from "@emotion/styled";

/**
 * This component shows a list of all the actors in the database.
 */

const ActorList = (props) => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const style = {
    spacingButton: {
      marginRight: 5,
    },
    title: {
      fontWeight: "bold",
    },
    StyleTableContainer: {
      maxHeight: 551,
    },
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.ternary.main,
      color: theme.palette.ternary.contrastText,
      fontWeight: "bold",
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: "#000",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  /**
   * By performing this useEffect we collect the data from all
   * the actors using the ActorService and if an error occurs
   * we send a message to the user
   */

  useEffect(() => {
    setLoading(true);
    async function retrieveActors() {
      try {
        const data = await ActorService.fgetAll();
        setActors(data);
        setError(null);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    }

    setTimeout(() => {
      retrieveActors();
      setLoading(false);
    }, 2000);
  }, [props]);

  const renderHeader = () => {
    const headerElement = [
      "Id",
      "Nombre",
      "Apellidos",
      "Actualizacion",
      "Opciones",
    ];

    return headerElement.map((key, index) => {
      return <StyledTableCell>{key.toUpperCase()}</StyledTableCell>;
    });
  };

  const renderBody = () => {
    return (
      actors &&
      actors.map(({ actorId, firstName, lastName, lastUpdate }, index) => (
        <StyledTableRow key={index}>
          <StyledTableCell>{index + 1}</StyledTableCell>
          <StyledTableCell>{firstName.toUpperCase()}</StyledTableCell>
          <StyledTableCell>{lastName.toUpperCase()}</StyledTableCell>
          <StyledTableCell>{lastUpdate}</StyledTableCell>
          <StyledTableCell>
            <Button
              color="secondary"
              LinkComponent={Link}
              to={`/actors/update/:${actorId}`}
              variant="contained"
              size="medium"
              style={style.spacingButton}
            >
              <CreateIcon color="inherit" />
            </Button>

            <Button
              LinkComponent={Link}
              to={`/actors/delete/:${actorId}`}
              variant="contained"
              size="medium"
            >
              <DeleteIcon color="inherit" />
            </Button>
          </StyledTableCell>
        </StyledTableRow>
      ))
    );
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ paddingTop: 2 }}
      >
        <Grid item xs>
          <Typography variant="h5" style={style.title}>
            Listado de actores
          </Typography>
        </Grid>
        <Grid item alignSelf="flex-end">
          <Button
            color="secondary"
            LinkComponent={Link}
            to="/actors/new"
            variant="contained"
          >
            Crear actor
          </Button>
        </Grid>
      </Grid>
      <section>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>{renderHeader()}</TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <TableContainer style={style.StyleTableContainer}>
          <Table>
            {loading && <Loader />}
            {error && (
              <Message
                msg={`Error ${error.code}: ${error.message}`}
                bgColor="#dc3545"
              />
            )}

            <TableBody>{renderBody()}</TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  );
};

export default ActorList;
