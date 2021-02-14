import { batchActions } from "redux-batched-actions";
import MarvelClient from "../Services/Marvel.Service";
import {
  setList,
  setCopyright,
  setRangeComics,
  setTotal,
} from "../Actions/Comics.Action";

export const getListComics = (params, currentPage, limit) => {
  return (dispatch) =>
    MarvelClient.get("comics", params)
      .then((response) => {
        let result = response.data;
        if (result.code === 200) {
          dispatch(
            batchActions([
              setList(result.data.results),
              setCopyright(result.attributionText),
              setRangeComics(
                limit * currentPage + 1 - limit,
                limit * currentPage
              ),
              setTotal(result.data.total),
            ])
          );
        } else console.log(`Code: ${result.code} - Status: ${result.status}`);
      })
      .catch(console.log);
};
