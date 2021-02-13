import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const Filter = ({ params, methods, list, selectedComics }) => {
  const { form } = params;
  const { handleSelectAllComics, handleChangeForm } = methods;

  const [check, setCheck] = useState(false);

  useEffect(() => {
    setCheck(
      list.length > 0 &&
        list.filter((comic) =>
          selectedComics.find((selectedComic) => selectedComic.id === comic.id)
        ).length === list.length
    );
  }, [list, selectedComics]);

  return (
    <div>
      <form style={{ margin: "25px 0" }}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} md={4}>
            <TextField
              name="title"
              value={form.title}
              label="Title"
              onChange={handleChangeForm}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Format</InputLabel>
              <Select
                name="format"
                value={form.format}
                onChange={handleChangeForm}
                label="Format"
              >
                <MenuItem value="all">All formats</MenuItem>
                <MenuItem value="comic">Comic</MenuItem>
                <MenuItem value="magazine">magazine</MenuItem>
                <MenuItem value="trade paperback">trade paperback</MenuItem>
                <MenuItem value="hardcover">hardcover</MenuItem>
                <MenuItem value="digest">digest</MenuItem>
                <MenuItem value="graphic novel">graphic novel</MenuItem>
                <MenuItem value="digital comic">digital comic</MenuItem>
                <MenuItem value="infinit comic">infinit comic</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={form.type}
                onChange={handleChangeForm}
                label="Type"
              >
                <MenuItem value="all">All types</MenuItem>
                <MenuItem value="comic">Comic</MenuItem>
                <MenuItem value="collection">collection</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Order</InputLabel>
              <Select
                name="order"
                value={form.order}
                onChange={handleChangeForm}
                label="Order By"
              >
                <MenuItem value="all">Pattern</MenuItem>
                <MenuItem value="focDate">Final Order Cutoff Date</MenuItem>
                <MenuItem value="-focDate">-Final Order Cutoff Date</MenuItem>
                <MenuItem value="onsaleDate">On Sale Date</MenuItem>
                <MenuItem value="-onsaleDate">-onsaleDate</MenuItem>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="-title">-Title</MenuItem>
                <MenuItem value="issueNumber">Issue Number</MenuItem>
                <MenuItem value="-issueNumber">-Issue Number</MenuItem>
                <MenuItem value="modified">Modified</MenuItem>
                <MenuItem value="-modified">-Modified</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
      <Grid container justify="center" style={{ marginBottom: "50px" }}>
        <Grid item xs={12} md={10}>
          <FormControlLabel
            control={
              <Checkbox
                checked={check}
                onChange={() =>
                  handleSelectAllComics(check ? "desselectAll" : "selectAll")
                }
                name="allComics"
                color="primary"
              />
            }
            label="Select all comics"
          />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  list: state.comics.list,
  selectedComics: state.comics.selectedComics,
});

export default connect(mapStateToProps)(Filter);
