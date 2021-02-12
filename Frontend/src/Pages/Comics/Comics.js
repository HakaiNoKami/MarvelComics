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
  const [rangeComics, setRangeComics] = useState({ first: "?", last: "?" });
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
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

  const sendEmail = async (mail) => {
    return await axios
      .post("http://localhost:3001", { mail, comics: selectedComics })
      .then((resp) => resp.data)
      .catch((err) => err.message);
  };

  useEffect(() => {
    setPage(1);
    getComics(1);
  }, [form, getComics]);

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    getComics(value);
  };

  const handleSelectAllComics = (action) => {
    action === "selectAll"
      ? setSelectedComics([...new Set([...selectedComics, ...list])])
      : setSelectedComics(
          selectedComics.filter((selectedComic) => !list.some((comic) => selectedComic.id === comic.id))
        );
  };

  const handleClickSendComics = async () => {
    if (selectedComics.length) {
      let response = await sendEmail("mhfgmv@gmail.com");
      alert(response.success ? "Success!" : response.message);
      setSelectedComics([]);
    } else alert("Select some comic!");
  };

  return (
    <div>
      <h1>Marvel Comics</h1>
      <p>{`${rangeComics.first} - ${rangeComics.last > total ? total : rangeComics.last} of ${total}`}</p>
      <Filter
        params={{ form, total, page }}
        methods={{ handleSelectAllComics, handleChangeForm, handleChangePage }}
        list={list}
        selectedComics={selectedComics}
      />
      <button onClick={handleClickSendComics}>Send all selected comics to email</button>
      {list.map((item) => (
        <CardComics key={item.id} params={{ info: item, selectedComics }} />
      ))}
      <p>{copyright}</p>
    </div>
  );
};

export default Comics;
