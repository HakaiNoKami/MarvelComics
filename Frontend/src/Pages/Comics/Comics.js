import React, { useState, useEffect, useCallback } from "react";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import * as comicsActions from "../../Actions/Comics.Action";
// import * as selectedComicsActions from "../../Actions/SelectedComics.Action";
import { getListComics } from "../../FetchActions/Comics.Fetch";
import CardComics from "../../Components/CardComics/CardComics";
import Filter from "../../Components/Filter/Filter";
import Pagination from "../../Components/Pagination/Pagination";
import { Fab, Typography, Container, Grid } from "@material-ui/core";
import "./Comics.scss";

// Icons
import SendIcon from "@material-ui/icons/Send";
import {
  addSelectedComics,
  clearSelectedComics,
} from "../../Constants/Comics.Constant";

document.title = "Marvel Comics";

const Comics = ({list, copyright, rangeComics, total}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [form, setForm] = useState({
    title: "",
    format: "all",
    type: "all",
    order: "all",
  });
  const dispatch = useDispatch();

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
      dispatch(getListComics({ params: options }, currentPage, limit));
    },
    [form, limit, dispatch]
  );

  // const sendEmail = async (mail) => {
  //   return await axios
  //     .post("http://localhost:3001", { mail, comics: selectedComics })
  //     .then((resp) => resp.data)
  //     .catch((err) => err.message);
  // };

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
      ? addSelectedComics(list)
      : clearSelectedComics(list);
  };

  const handleClickSendComics = async () => {
    // if (selectedComics.length) {
    //   let response = await sendEmail("mhfgmv@gmail.com");
    //   alert(response.success ? "Success!" : response.message);
    //   clearSelectedComics();
    // } else alert("Select some comic!");
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
        />
        <Grid
          container
          spacing={2}
          justify="space-evenly"
          alignItems="flex-start"
        >
          {list.map((item) => (
            <CardComics key={item.id} params={{ info: item }} />
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
        <Pagination
          params={{ total, page, limit, rangeComics }}
          methods={{ handleChangePage, handleChangeLimit }}
        />
        <Typography variant="caption" align="center" component="p">
          {copyright}
        </Typography>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  list: state.comics.list,
  selectedComics: state.comics.selectedComics,
  copyright: state.comics.copyright,
  rangeComics: state.comics.rangeComics,
  total: state.comics.total,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...comicsActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Comics);
