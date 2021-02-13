import * as comicsConstants from "../Constants/Comics.Constant";

const initalState = {
  list: [],
  copyright: "",
  rangeComics: { first: "?", last: "?" },
  selectedComics: [],
  total: 0,
};

export default function comics(state=initalState, action) {
  switch (action.type) {
    case comicsConstants.setList:
      return { ...state, list: action.list };
    case comicsConstants.setCopyright:
      return { ...state, copyright: action.text };
    case comicsConstants.setRangeComics:
      return {
        ...state,
        rangeComics: { first: action.first, last: action.last },
      };
    case comicsConstants.addSelectedComics:
      return {
        ...state,
        selectedComics: [...new Set([...state, ...action.comics])],
      };
    case comicsConstants.removeSelectedComics:
      return {
        ...state,
        selectedComics: state.filter(
          (selectedComic) =>
            !action.comics.some((comic) => selectedComic.id === comic.id)
        ),
      };
    case comicsConstants.clearSelectedComics:
      return { ...state, selectedComics: [] };
    case comicsConstants.setTotal:
      return { ...state, total: action.total };
    default:
      return state;
  }
}

// export default function copyright(state = "", action) {
//   switch (action.type) {

//     default:
//       return "";
//   }
// }

// export default function rangeComics(state = { first: "?", last: "?" }, action) {
//   switch (action.type) {

//     default:
//       return { first: "?", last: "?" };
//   }
// }

// export default function selectedComics(state = [], action) {
//   switch (action.type) {

//     default:
//       return [];
//   }
// }

// export default function total(state = 0, action) {
//   switch (action.type) {

//     default:
//       return 0;
//   }
// }
