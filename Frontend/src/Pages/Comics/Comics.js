import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CardComics from "../../Components/CardComics/CardComics";
import Filter from "../../Components/Filter/Filter";
import Pagination from "../../Components/Pagination/Pagination";
import { Fab, Typography, Container, Grid } from "@material-ui/core";
import "./Comics.scss";

// Icons
import SendIcon from "@material-ui/icons/Send";

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
  const [limit, setLimit] = useState(25);
  const [form, setForm] = useState({
    title: "",
    format: "all",
    type: "all",
    order: "all",
  });
  const [selectedComics, setSelectedComics] = useState([]);
  const [copyright, setCopyright] = useState("");

  const getComics = useCallback(
    (newPage) => {
      let currentPage = newPage || 1;
      let options = {
        limit: limit,
        offset: limit * (currentPage - 1),
      };
      if (form.title) options.titleStartsWith = form.title;
      if (form.format !== "all") options.format = form.format;
      if (form.type !== "all") options.formatType = form.type;
      if (form.order !== "all") options.orderBy = form.order;
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
              first: limit * currentPage + 1 - limit,
              last: limit * currentPage,
            });
            setTotal(result.data.total);
          } else console.log(`Code: ${result.code} - Status: ${result.status}`);
        })
        .catch((err) => console.log(err));
    },
    [form, limit]
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

  const handleChangeLimit = (event) => {
    setLimit(event.target.value);
    getComics(event.target.value);
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
      <div>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center">
            Marvel Comics
          </Typography>
        </Container>
      </div>

      <Container maxWidth="lg">
        <Filter
          params={{ form }}
          methods={{ handleSelectAllComics, handleChangeForm }}
          list={list}
          selectedComics={selectedComics}
        />
        <Grid container spacing={2} justify="space-evenly" alignItems="flex-start">
          {list.map((item) => (
            <CardComics key={item.id} params={{ info: item, selectedComics }} />
          ))}
        </Grid>
        <Fab
          variant="extended"
          color="primary"
          onClick={handleClickSendComics}
          style={{ position: "fixed", right: "20px", bottom: "20px" }}
        >
          <SendIcon />
          <Typography variant="button" style={{ marginLeft: "5px" }}>
            To email
          </Typography>
        </Fab>
        <Pagination params={{ total, page, limit, rangeComics }} methods={{ handleChangePage, handleChangeLimit }} />
        <Typography variant="caption" align="center" component="p">
          {copyright}
        </Typography>
      </Container>
    </div>
  );
};

export default Comics;
