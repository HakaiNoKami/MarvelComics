import React from "react";
import { Paper, Grid, IconButton, Typography, Button } from "@material-ui/core";

// Icons
import CloseIcon from "@material-ui/icons/Close";

const getPriceType = (type) => {
  switch (type) {
    case "printPrice":
      return "Print Price";
    default:
      return "Not found";
  }
};

const ComicModel = ({ comic, close }) => {
  return (
    <Paper
      elevation={1}
      style={{
        width: "calc(94% - 50px)",
        maxWidth: "600px",
        margin: "25px auto",
        padding: "25px",
        position: "relative",
        maxHeight: "calc(100vh - 100px)",
        overflow: "auto",
      }}
    >
      <IconButton
        color="primary"
        aria-label="close"
        component="span"
        onClick={close}
        style={{ position: "absolute", right: "25px", top: "25px" }}
      >
        <CloseIcon />
      </IconButton>
      <Grid container spacing={4} direction="column">
        <Grid item>
          <Typography variant="h4" style={{ paddingRight: "50px" }}>
            {comic.title} - {comic.id}
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            justify="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
                style={{ maxWidth: "100%" }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container direction="column" spacing={2}>
                {comic.description && (
                  <Grid item>
                    <Typography variant="body1">{comic.description}</Typography>
                  </Grid>
                )}
                <Grid item>
                  {comic.prices.length > 0 &&
                    comic.prices.map((price) => (
                      <Typography
                        key={price.type}
                        variant="body2"
                      >{`${getPriceType(price.type)}: $${
                        price.price
                      }`}</Typography>
                    ))}
                </Grid>
                <Grid item>
                  {comic.pageCount > 0 && (
                    <Typography variant="body2">
                      Page count: {comic.pageCount}
                    </Typography>
                  )}
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" fullWidth>
                    Send this comic to the email
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ComicModel;
