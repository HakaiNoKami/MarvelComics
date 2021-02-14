import React, { useState, useEffect, useCallback } from "react";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import * as comicsActions from "../../Actions/Comics.Action";
import { getListComics } from "../../FetchActions/Comics.Fetch";
import { sendComicsToMail } from "../../FetchActions/Mail.Fetch";
import CardComics from "../../Components/CardComics/CardComics";
import Filter from "../../Components/Filter/Filter";
import Pagination from "../../Components/Pagination/Pagination";
import {
  Fab,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import "./Comics.scss";
import { Alert } from "@material-ui/lab";

// Icons
import SendIcon from "@material-ui/icons/Send";

document.title = "Marvel Comics";

const Comics = ({
  list,
  selectedComics,
  copyright,
  rangeComics,
  total,
  addSelectedComics,
  clearSelectedComics,
  mail,
}) => {
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(true);
  const [snackbar, setSnackbar] = useState({
    type: "",
    message: "",
    status: false,
  });
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
      setLoading(true);
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

  useEffect(() => {
    setPage(1);
    getComics(1);
  }, [form, getComics]);

  useEffect(() => {
    if (mail.status && mail.message) clearSelectedComics();
    else if (mail.message) console.log(mail.message);
    if (mail.message)
      setSnackbar({
        type: mail.status ? "success" : "error",
        message: mail.status
          ? "Success sending the comics"
          : "Error sending the comics",
        status: true,
      });
    setLoadingButton(false);
  }, [mail, clearSelectedComics]);

  useEffect(() => {
    if (list.length) setLoading(false);
  }, [list]);

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
    if (selectedComics.length) {
      setLoadingButton(true);
      dispatch(sendComicsToMail("mhfgmv@gmail.com", selectedComics));
    } else
      setSnackbar({
        type: "warning",
        message: "Select some comic!",
        status: true,
      });
  };

  return (
    <div>
      <Container maxWidth="lg" className="logo-block">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/04/MarvelLogo.svg"
          alt="Marvel Comics"
          id="logo"
        />
      </Container>

      <Container maxWidth="lg">
        <Filter
          params={{ form }}
          methods={{ handleSelectAllComics, handleChangeForm }}
          list={list}
        />
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <>
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
              {loadingButton ? (
                <CircularProgress
                  style={{ width: "24px", height: "24px", color: "#ffffff" }}
                />
              ) : (
                <SendIcon />
              )}
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
          </>
        )}
      </Container>
      <Snackbar
        open={snackbar.status}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, status: false })}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={snackbar.type}
          onClose={() => setSnackbar({ ...snackbar, status: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  list: state.comics.list,
  selectedComics: state.comics.selectedComics,
  copyright: state.comics.copyright,
  rangeComics: state.comics.rangeComics,
  total: state.comics.total,
  mail: state.mail,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(comicsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Comics);
