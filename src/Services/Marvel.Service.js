import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_MARVEL_BASE_URL,
  headers: {
    common: {
      "Content-Type": "application/json; charset=utf-8",
    },
  },
  params: {
    apikey: process.env.REACT_APP_MARVEL_API_KEY,
  },
});