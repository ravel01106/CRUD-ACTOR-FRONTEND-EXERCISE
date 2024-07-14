import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import ActorService from "../../services/actor.service";
import { TextField, Box, Container, Typography, Button } from "@mui/material";

/**
 * This component contains a form that is used both to insert
 * a new actor and to update it.
 */

const ActorForm = (props) => {
  const { title } = props;
  const { _id } = useParams();

  const initialActorState = {
    firstName: "",
    lastName: "",
  };
  const [currentActor, setCurrentActor] = useState(initialActorState);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCurrentActor({
      ...currentActor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      currentActor.firstName.trim() === "" ||
      currentActor.lastName.trim() === ""
    ) {
      NotificationManager.error("Todos los campos son necesarios");
      return;
    }
    /**
     * This function, depending on the parameter set,
     * will insert new data or update data by calling
     * the ActorService functions.
     * @param isInserting If true, new data will be inserted, otherwise,
     * they will be updated.
     */
    async function insertOrUpdateActor(isInserting) {
      try {
        if (isInserting) {
          await ActorService.fcreate(currentActor);
          NotificationManager.success("actor añadido");
        } else {
          const id = Number(_id.slice(1));
          await ActorService.fUpdateActor(id, currentActor);
          NotificationManager.success("actor actualizado");
        }
        setTimeout(() => {
          navigate("/actors");
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }

    if (title === "Editar") {
      insertOrUpdateActor(false);
    } else {
      insertOrUpdateActor(true);
    }
  };

  /**
   * This useEffect is used, if we are updating data,
   * to set the values corresponding to the fields
   * in the form by default.
   */

  useEffect(() => {
    async function getActor() {
      const id = Number(_id.slice(1));
      console.log(id);
      const actor = await ActorService.fgetOneActor(id);
      setCurrentActor(actor);
    }

    if (_id !== undefined) {
      getActor();
    }
  }, [_id]);

  const style = {
    styleHeader: {
      color: "#000",
      padding: 10,
      textAlign: "center",
    },
    styleContainer: {
      height: 350,
      marginTop: 40,
      backgroundColor: "#fff",
      width: 600,
    },
    styleButton: {
      marginRight: 60,
      paddingRight: 50,
      paddingLeft: 50,
    },
    styleButtonCancel: {
      paddingRight: 50,
      paddingLeft: 50,
    },
    styleMainContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <div style={style.styleMainContainer}>
      <Box
        style={style.styleContainer}
        border={2}
        borderColor={"ternary.main"}
        borderRadius={10}
      >
        <NotificationContainer />
        <Container style={style.styleHeader}>
          <Typography variant="h4" fontWeight="bold" color="ternary.dark">
            {title} Actor
          </Typography>
        </Container>
        <div className="modal-body">
          <Box component="form" onSubmit={handleSubmit}>
            <div className="mb-3 mx-3">
              <TextField
                id="firstName"
                name="firstName"
                label="Nombre"
                type="text"
                variant="standard"
                fullWidth
                helperText="Ingrese un nombre valido"
                value={currentActor.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 mx-3">
              <TextField
                id="lastName"
                name="lastName"
                label="Apellidos"
                type="text"
                fullWidth
                variant="standard"
                helperText="Ingrese un apellido valido"
                value={currentActor.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 mx-3 centered">
              <Button
                variant="contained"
                size="large"
                type="submit"
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
            </div>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default ActorForm;
