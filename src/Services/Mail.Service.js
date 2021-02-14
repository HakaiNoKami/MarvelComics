import axios from "axios";

const mailClient = axios.create({
  baseURL: process.env.REACT_APP_MAIL_BASE_URL,
  headers: {
    common: {
      "Content-Type": "application/json; charset=utf-8",
    },
  },
});

export default mailClient;
