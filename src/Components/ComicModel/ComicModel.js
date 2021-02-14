import React from "react";
import { Paper, Grid, IconButton, Typography, Container } from "@material-ui/core";
import "./ComicModel.scss";

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
  console.log(comic);

  return (
    <Paper elevation={1} className="comic-model">
      <div className="bg-comic">
        <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt="bg-comic" />
      </div>
      <div className="comic-info-block">
        <div className="close">
          <IconButton color="primary" aria-label="close" component="span" onClick={close}>
            <CloseIcon />
          </IconButton>
        </div>
        <Container maxWidth="lg" className="comic-info">
          <Grid container spacing={2} direction="column">
            <Grid item xs={12} className="title-modal-mobile">
              <Typography variant="h4">
                {comic.title} - {comic.id}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container justify="space-between" alignItems="flex-start" spacing={4}>
                <Grid item xs={12} sm={4} md={3} className="image-block">
                  <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Grid container direction="column" spacing={4}>
                    <Grid item className="title-modal-default">
                      <Typography variant="h4">
                        {comic.title} - {comic.id}
                      </Typography>
                    </Grid>
                    {comic.creators.available > 0 && (
                      <>
                        {comic.creators.items.filter((creator) => creator.role.includes("writer")).length > 0 && (
                          <Grid item>
                            <Typography variant="h6">Writer</Typography>
                            <Typography variant="body1">
                              {comic.creators.items
                                .filter((creator) => creator.role.includes("writer"))
                                .map((creator) => creator.name)
                                .join(", ")}
                            </Typography>
                          </Grid>
                        )}
                        {comic.creators.items.filter((creator) => creator.role.includes("penciller")).length > 0 && (
                          <Grid item>
                            <Typography variant="h6">Penciler</Typography>
                            <Typography variant="body1">
                              {comic.creators.items
                                .filter((creator) => creator.role.includes("penciller"))
                                .map((creator) => creator.name)
                                .join(", ")}
                            </Typography>
                          </Grid>
                        )}
                        {comic.creators.items.filter((creator) => creator.role.includes("editor")).length > 0 && (
                          <Grid item>
                            <Typography variant="h6">Editor</Typography>
                            <Typography variant="body1">
                              {comic.creators.items
                                .filter((creator) => creator.role.includes("editor"))
                                .map((creator) => creator.name)
                                .join(", ")}
                            </Typography>
                          </Grid>
                        )}
                      </>
                    )}
                    {comic.description && (
                      <Grid item>
                        <Typography
                          variant="body1"
                          dangerouslySetInnerHTML={{ __html: comic.description }}
                        ></Typography>
                      </Grid>
                    )}
                    {comic.prices.length > 0 && (
                      <Grid item>
                        {comic.prices.map((price) => (
                          <Typography key={price.type} variant="body2">{`${getPriceType(price.type)}: $${
                            price.price
                          }`}</Typography>
                        ))}
                      </Grid>
                    )}
                    {comic.pageCount > 0 && (
                      <Grid item>
                        <Typography variant="body2">Page count: {comic.pageCount}</Typography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Paper>
  );
};

export default ComicModel;
