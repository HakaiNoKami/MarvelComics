import * as comicsConstants from "../Constants/Comics.Constant";

const initalState = {
  list: [],
  copyright: "",
  rangeComics: { first: "?", last: "?" },
  selectedComics: [],
  total: 0,
};

export default function comics(state = initalState, action) {
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
        selectedComics: [
          ...new Set([...state.selectedComics, ...action.comics]),
        ],
      };
    case comicsConstants.removeSelectedComics:
      return {
        ...state,
        selectedComics: state.selectedComics.filter(
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