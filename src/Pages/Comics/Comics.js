import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./Comics.scss";

document.title = "Marvel Comics";

const marvelClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    common: {
      "Content-Type": "application/json; charset=utf-8",
    },
  },
  params: {
    apikey: process.env.REACT_APP_API_KEY,
  },
});

const Comics = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (list.length) {
      console.log(list);
      return;
    }

    marvelClient
      .get("comics", {
        params: {
          limit: 20,
        },
      })
      .then((response) => {
        let result = response.data;
        if (result.code === 200) setList(result.data.results);
        else console.log(`Code: ${result.code} - Status: ${result.status}`);
      })
      .catch((err) => console.log(err));
  }, [list]);

  return (
    <div>
      <h1>Marvel Comics</h1>
      {list.forEach((item) => {
        <div key={item.id}>
          <h4>{item.title}</h4>
          <img
            alt={item.title}
            src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
          />
          <p>Description: {item.description}</p>
          <p>Modified: {moment(item.modified, "MM-DD-YYYY", true)}</p>
        </div>;
      })}
    </div>
  );
};

export default Comics;
