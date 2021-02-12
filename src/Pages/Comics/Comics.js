import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CardComics from "../../Components/CardComics/CardComics";
import Filter from "../../Components/Filter/Filter";
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
  const [rangeComics, setRangeComics] = useState({ first: 1, last: 20 });
  const [total, setTotal] = useState(0);
  // const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    title: "",
    limit: 20,
    format: "",
    type: "",
    order: "",
  });
  const [selectedComics, setSelectedComics] = useState([]);
  const [copyright, setCopyright] = useState("");

  const getComics = useCallback(
    (newPage) => {
      let currentPage = newPage || 1;
      let options = {
        limit: form.limit,
        offset: form.limit * (currentPage - 1),
      };
      if (form.title) options.titleStartsWith = form.title;
      if (form.format) options.format = form.format;
      if (form.type) options.formatType = form.type;
      if (form.order) options.orderBy = form.order;
      marvelClient
        .get("comics", {
          params: options,
        })
        .then((response) => {
          let result = response.data;
          if (result.code === 200) {
            setList(result.data.results);
            setCopyright(result.attributionText);
            setRangeComics({
              first: form.limit * currentPage + 1 - form.limit,
              last: form.limit * currentPage,
            });
            setTotal(result.data.total);
          } else console.log(`Code: ${result.code} - Status: ${result.status}`);
        })
        .catch((err) => console.log(err));
    },
    [form]
  );

  useEffect(() => {
    if (!list.length) getComics();
  }, [list, getComics]);

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    getComics(1);
  };

  const handleChangePage = (value) => {
    getComics(value);
  };

  return (
    <div>
      <h1>Marvel Comics</h1>
      <p>{`${rangeComics.first} - ${
        rangeComics.last > total ? total : rangeComics.last
      } of ${total}`}</p>
      <Filter
        form={form}
        handleSubmitForm={handleSubmitForm}
        handleChangeForm={handleChangeForm}
        handleChangePage={handleChangePage}
      />
      {list.map((item) => (
        <CardComics
          info={item}
          key={item.id}
          selectedComics={selectedComics}
          setSelectedComics={setSelectedComics}
          marvelClient={marvelClient}
        />
      ))}
      <p>{copyright}</p>
    </div>
  );
};

export default Comics;
