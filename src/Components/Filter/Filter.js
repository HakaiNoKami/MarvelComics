import React, { useState, useEffect } from "react";
import { Pagination } from "@material-ui/lab";

const Filter = ({ params, methods, list, selectedComics }) => {
  const { form, total, page } = params;
  const { handleChangeForm, handleChangePage, handleSelectAllComics } = methods;

  const [check, setCheck] = useState(false);

  useEffect(() => {
    setCheck(
      list.length &&
        list.filter((comic) => selectedComics.find((selectedComic) => selectedComic.id === comic.id)).length ===
          list.length
    );
  }, [list, selectedComics]);

  return (
    <div>
      <form>
        <input name="title" value={form.title} placeholder="Title" onChange={handleChangeForm} />
        <select name="limit" defaultValue={20} onChange={handleChangeForm}>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
        <select name="format" defaultValue="" onChange={handleChangeForm}>
          <option value="">All</option>
          <option value="comic">Comic</option>
          <option value="magazine">magazine</option>
          <option value="trade paperback">trade paperback</option>
          <option value="hardcover">hardcover</option>
          <option value="digest">digest</option>
          <option value="graphic novel">graphic novel</option>
          <option value="digital comic">digital comic</option>
          <option value="infinit comic">infinit comic</option>
        </select>
        <select name="type" defaultValue="" onChange={handleChangeForm}>
          <option value="">All</option>
          <option value="comic">Comic</option>
          <option value="collection">collection</option>
        </select>
        <select name="order" defaultValue="" onChange={handleChangeForm}>
          <option value="">All</option>
          <option value="focDate">Final Order Cutoff Date</option>
          <option value="-focDate">-Final Order Cutoff Date</option>
          <option value="onsaleDate">On Sale Date</option>
          <option value="-onsaleDate">-onsaleDate</option>
          <option value="title">Title</option>
          <option value="-title">-Title</option>
          <option value="issueNumber">Issue Number</option>
          <option value="-issueNumber">-Issue Number</option>
          <option value="modified">Modified</option>
          <option value="-modified">-Modified</option>
        </select>
      </form>
      <Pagination count={Math.ceil(total / form.limit)} page={page} onChange={handleChangePage} />
      <label>
        <input
          type="checkbox"
          checked={check}
          onChange={() => handleSelectAllComics(check ? "desselectAll" : "selectAll")}
        />
        <span>Select all comics</span>
      </label>
    </div>
  );
};

export default Filter;
