import React from "react";
import { Grid, Typography, FormControl, Select, MenuItem } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const Filter = ({ params, methods }) => {
  const { total, page, limit, rangeComics } = params;
  const { handleChangePage, handleChangeLimit } = methods;

  return (
    <div style={{ margin: "50px 0 25px" }}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="body1">Comics by page: </Typography>
            </Grid>
            <Grid item>
              <FormControl variant="outlined">
                <Select value={limit} onChange={handleChangeLimit}>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="body1" align="center">
            <Typography variant="body2" component="b">
              {rangeComics.first}
            </Typography>
            -
            <Typography variant="body2" component="b">
              {rangeComics.last > total ? total : rangeComics.last}
            </Typography>
            {` of `}
            <Typography variant="body2" component="b">
              {total}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container justify="center">
            <Grid item>
              <Pagination color="primary" count={Math.ceil(total / limit)} page={page} onChange={handleChangePage} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Filter;
