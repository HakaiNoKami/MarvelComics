import React from "react";

const CardComics = ({info}) => {
  return (
    <div>
      <h4>{info.title}</h4>
      <img alt={info.title} src={`${info.thumbnail.path}.${info.thumbnail.extension}`} style={{ maxWidth: "100px" }} />
      <p>Description: {info.description || "..."}</p>
    </div>
  );
};

export default CardComics;
