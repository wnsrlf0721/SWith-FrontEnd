import axios from "axios";

const defaultaxios = axios.create({
  baseURL: "/api",
});

export default defaultaxios;
