import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as comicsActions from "../../Actions/Comics.Action";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  FormControlLabel,
  Checkbox,
  Button,
  Modal,
} from "@material-ui/core";
import ComicModel from "../ComicModel/ComicModel";
import "./CardComics.scss";

const CardComics = ({ params, selectedComics, removeSelectedComics, addSelectedComics }) => {
  const { info } = params;
  const [check, setCheck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCheck(selectedComics.some((item) => item.id === info.id));
  }, [info, selectedComics]);

  const handleChangeCheck = () => {
    selectedComics.some((item) => item.id === info.id) ? removeSelectedComics([info]) : addSelectedComics([info]);
    setCheck(!check);
  };

  const handleChangeModel = () => {
    setOpen(!open);
  };

  return (
    <Grid item xs={12} sm={6} md={3} className="card-comic">
      <Card>
        <CardActionArea>
          <CardMedia image={`${info.thumbnail.path}.${info.thumbnail.extension}`} title={info.title} />
          <CardContent>
            <div className="title-content">
              <Typography gutterBottom variant="h5" component="h2" title={info.title}>
                {info.title}
              </Typography>
            </div>
            {info.description && (
              <div className="description-content">
                <Typography variant="body2" color="textSecondary" component="p" title={info.description}>
                  {info.description}
                </Typography>
              </div>
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <FormControlLabel
            control={<Checkbox checked={check} onChange={handleChangeCheck} color="primary" />}
            label={
              <Typography variant="button" color="primary">
                Select comic
              </Typography>
            }
          />
          <Button size="small" color="primary" onClick={handleChangeModel}>
            Learn More
          </Button>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleChangeModel}
        aria-labelledby="comic-model-title"
        aria-describedby="comic-model-description"
      >
        <>
          <ComicModel comic={info} close={handleChangeModel} />
        </>
      </Modal>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  selectedComics: state.comics.selectedComics,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(comicsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CardComics);
