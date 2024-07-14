//import axios from "axios";

const API_URL = "http://localhost:8081/api/v1";

/**
 * Performs a fetching to the api to collect all
 * the actors in the table and return the data obtained.
 * @returns all the actors in the database
 */
const fgetAll = async () => {
  const response = await fetch(`${API_URL}/actors`);
  const actors = await response.json();
  return actors;
};

/**
 * Performs a fetching to the API with
 * the POST method to insert the new actor
 * that we pass as a parameter
 * @param data The data of the actor we want to insert
 */
const fcreate = async (data) => {
  await fetch(`${API_URL}/actors`, {
    method: "POST",
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

/**
 * Performs a fetching to the api to obtain the actor
 * we want using its id.
 * @param id the id of the actor we want to obtain
 * @returns The actor we want to obtain
 */
const fgetOneActor = async (id) => {
  const response = await fetch(`${API_URL}/actors/${id}`);
  const actor = await response.json();
  return actor;
};

/**
 * Performs a fetching to the API with the PUT method
 * to update the actor's data with the data and the id
 * that we pass as parameter
 * @param id The id of the actor we want to update
 * @param data The new data we want to enter
 */
const fUpdateActor = async (id, data) => {
  await fetch(`${API_URL}/actors/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

/**
 * Performs a fetching to the API with the DELETE method
 * to delete the data of the actor with the id that
 * we passed as parameter
 * @param id the id of the actor we want to delete
 */
const fDeleteActor = async (id) => {
  await fetch(`${API_URL}/actors/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const ActorService = {
  fgetAll,
  fcreate,
  fgetOneActor,
  fUpdateActor,
  fDeleteActor,
};

export default ActorService;
