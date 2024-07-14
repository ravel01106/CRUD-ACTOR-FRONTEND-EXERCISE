import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ActorService from "../../services/actor.service";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Box, Container, Typography, Button } from "@mui/material";

/**
 * This component shows us the data of the actor we want to delete.
 */

const ActorDelete = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const initialActorState = {
    firstName: "",
    lastName: "",
  };
  const [currentActor, setCurrentActor] = useState(initialActorState);

  /**
   * This function deletes the actor
   * we have selected by calling the delete function
   * of the ActorService
   */

  const OnDeleteActor = () => {
    async function deleteActor() {
      try {
        const id = Number(_id.slice(1));
        await ActorService.fDeleteActor(id);
        NotificationManager.success("Actor eliminado");
        setTimeout(() => {
          navigate("/actors");
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
    deleteActor();
  };
  /**
   * Using this function we get the data of the actor to be deleted
   * for displaying them
   */
  useEffect(() => {
    async function getActor() {
      if (_id != null) {
        const id = Number(_id.slice(1));
        console.log(id);
        const actor = await ActorService.fgetOneActor(id);
        setCurrentActor(actor);
      }
    }
    getActor();
  }, [_id]);

  const style = {
    styleHeader: {
      color: "#000",
      padding: 10,
      textAlign: "center",
    },
    styleMainContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    styleContainer: {
      height: 320,
      marginTop: 40,
      backgroundColor: "#fff",
      width: 600,
    },
    styleButton: {
      marginTop: 30,
      marginRight: 40,
      paddingRight: 50,
      paddingLeft: 50,
    },
    styleButtonCancel: {
      paddingRight: 50,
      paddingLeft: 50,
      marginTop: 30,
    },
    styleText: {
      display: "flex",
      flexDirection: "row",
      margin: 20,
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  };

  return (
    <div style={style.styleMainContainer}>
      <NotificationContainer />
      <Box
        style={style.styleContainer}
        border={2}
        borderColor={"ternary.main"}
        borderRadius={10}
      >
        <Container style={style.styleHeader}>
          <Typography variant="h4" fontWeight="bold" color="ternary.dark">
            Eliminar Actor
          </Typography>
        </Container>
        <div className="modal-body">
          <Box component="div">
            <Box component="div" style={style.styleText}>
              <Typography variant="h5" fontWeight="bold" color="ternary.dark">
                Nombre:
              </Typography>
              <Typography variant="h5">
                {currentActor.firstName.toUpperCase()}
              </Typography>
            </Box>
            <Box component="div" style={style.styleText}>
              <Typography variant="h5" fontWeight="bold" color="ternary.dark">
                Apellidos:
              </Typography>
              <Typography variant="h5">
                {currentActor.lastName.toUpperCase()}
              </Typography>
            </Box>
            <Box component="div" style={style.styleText}>
              <Button
                variant="contained"
                size="large"
                onClick={OnDeleteActor}
                style={style.styleButton}
              >
                Grabar
              </Button>
              <Button
                color="secondary"
                LinkComponent={Link}
                to={"/actors"}
                variant="contained"
                size="large"
                style={style.styleButtonCancel}
              >
                Cancelar{" "}
              </Button>
            </Box>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default ActorDelete;
