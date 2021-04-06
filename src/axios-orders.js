import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-builder-8d4af-default-rtdb.firebaseio.com/",
});

export default instance;
