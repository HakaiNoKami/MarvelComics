import React, { useState, useEffect } from "react";

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
    <div>
      <h4>{info.title}</h4>
      <img alt={info.title} src={`${info.thumbnail.path}.${info.thumbnail.extension}`} style={{ maxWidth: "100px" }} />
      <p>Description: {info.description || "..."}</p>
      <div>
        <label>
          <input type="checkbox" checked={check} onChange={handleChangeCheck} />
          <span> Select comic</span>
        </label>
      </div>
      <button onClick={handleClickMore}>More</button>
    </div>
  );
};

export default CardComics;
