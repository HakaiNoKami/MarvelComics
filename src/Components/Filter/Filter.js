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
  Typography,
} from "@material-ui/core";
import "./Filter.scss";

const Filter = ({ params, methods, list, selectedComics }) => {
  const { form } = params;
  const { handleSelectAllComics, handleChangeForm } = methods;

  const [check, setCheck] = useState(false);

  useEffect(() => {
    setCheck(
      list.length > 0 &&
        list.filter((comic) => selectedComics.find((selectedComic) => selectedComic.id === comic.id)).length ===
          list.length
    );
  }, [list, selectedComics]);

  return (
    <div className="filter">
      <form>
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
              <Select name="format" value={form.format} onChange={handleChangeForm} label="Format">
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
              <Select name="type" value={form.type} onChange={handleChangeForm} label="Type">
                <MenuItem value="all">All types</MenuItem>
                <MenuItem value="comic">Comic</MenuItem>
                <MenuItem value="collection">collection</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Order</InputLabel>
              <Select name="order" value={form.order} onChange={handleChangeForm} label="Order By">
                <MenuItem value="all">Pattern</MenuItem>
                <MenuItem value="focDate">&uarr; Final Order Cutoff Date</MenuItem>
                <MenuItem value="-focDate">&darr; Final Order Cutoff Date</MenuItem>
                <MenuItem value="onsaleDate">&uarr; On Sale Date</MenuItem>
                <MenuItem value="-onsaleDate">&darr; onsaleDate</MenuItem>
                <MenuItem value="title">&uarr; Title</MenuItem>
                <MenuItem value="-title">&darr; Title</MenuItem>
                <MenuItem value="issueNumber">&uarr; Issue Number</MenuItem>
                <MenuItem value="-issueNumber">&darr; Issue Number</MenuItem>
                <MenuItem value="modified">&uarr; Modified</MenuItem>
                <MenuItem value="-modified">&darr; Modified</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
      <Grid container justify="center">
        <Grid item xs={12} md={10}>
          <Grid container justify="space-between" alignItems="center" className="selected-block">
            <Grid item xs={12} sm={7} className="selected-checkbox">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={check}
                    onChange={() => handleSelectAllComics(check ? "desselectAll" : "selectAll")}
                    name="allComics"
                    color="primary"
                  />
                }
                label="Select all comics on this page"
              />
            </Grid>
            <Grid item xs={12} sm={5} className="selected-total">
              <Typography variant="body1">Total comics selected: {selectedComics.length}</Typography>
            </Grid>
          </Grid>
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
