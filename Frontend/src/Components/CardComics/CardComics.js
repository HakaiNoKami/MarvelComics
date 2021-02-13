import React, { useState, useEffect } from "react";
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
} from "@material-ui/core";

const CardComics = ({ params }) => {
  const { info, selectedComics } = params;
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setCheck(selectedComics.some((item) => item.id === info.id));
  }, [info, selectedComics]);

  const handleChangeCheck = () => {
    selectedComics.some((item) => item.id === info.id)
      ? selectedComics.splice(
          selectedComics.findIndex((item) => item.id === info.id),
          1
        )
      : selectedComics.push(info);
    setCheck(!check);
  };

  const handleClickMore = () => {
    console.log(info);
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardActionArea>
          <CardMedia
            style={{ height: "200px" }}
            image={`${info.thumbnail.path}.${info.thumbnail.extension}`}
            title={info.title}
          />
          <CardContent style={{height: "170px"}}>
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                marginBottom: "8px"
              }}
            >
              <Typography gutterBottom variant="h5" component="h2" title={info.title}>
                {info.title}
              </Typography>
            </div>
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "5",
                WebkitBoxOrient: "vertical",
              }}
            >
              <Typography variant="body2" color="textSecondary" component="p" title={info.description || "..."}>
                {info.description || "..."}
              </Typography>
            </div>
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
          <Button size="small" color="primary" onClick={handleClickMore}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CardComics;
