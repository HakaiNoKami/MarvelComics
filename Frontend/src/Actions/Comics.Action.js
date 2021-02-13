import * as comicsConstants from "../Constants/Comics.Constant";

export function setList(list) {
  return {
    type: comicsConstants.setList,
    list,
  };
}

export function setCopyright(text) {
  return {
    type: comicsConstants.setCopyright,
    text,
  };
}

export function setRangeComics(first, last) {
  return {
    type: comicsConstants.setRangeComics,
    first,
    last,
  };
}

export function addSelectedComics(comics) {
  return {
    type: comicsConstants.addSelectedComics,
    comics,
  };
}

export function removeSelectedComics(comics) {
  return {
    type: comicsConstants.removeSelectedComics,
    comics,
  };
}

export function clearSelectedComics() {
  return {
    type: comicsConstants.clearSelectedComics,
  };
}

export function setTotal(total) {
  return {
    type: comicsConstants.setTotal,
    total,
  };
}
