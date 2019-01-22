import * as M from "materialize-css";

const shelfParser = {
  toR: "To Read",
  cR: "Currently Reading",
  r: "read"
};

//Parsing the Fetched Data from the api

export const handleFetchedData = books => {
  const fetchedBooks = books.map(book => {
    return {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      desc: book.volumeInfo.description,
      averageRating: book.volumeInfo.averageRating,
      imageLinks: book.volumeInfo.imageLinks,
      pageCount: book.volumeInfo.pageCount,
      shelf: ""
    };
  });

  return fetchedBooks;
};

//Filter the array for duplicates and return uniqueItems
export const onlyUnique = (value, index, self) => self.indexOf(value) === index;

//add Item to local storage

export const addToLocalStorage = (key, data) => {
  if (localStorage) {
    // let oldData = JSON.parse(localStorage.getItem(key));
    // if (oldData && oldData.length !== 0) {
    //   oldData = oldData.filter(onlyUnique)
    //   const newData = [...oldData, ...data].filter(onlyUnique);
    //   localStorage.setItem(key, JSON.stringify(newData));
    // } else {
    //   localStorage.setItem(key, JSON.stringify(data));
    // }
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const getDataFromLocalStorage = key =>
  JSON.parse(localStorage.getItem(key));

export const bookShelfManager = (books, id, shelf, toast = false) => {
  return books
    .map(book => {
      if (book.id === id) {
        book.shelf = shelf;
        if (toast) {
          M.toast({
            html: `"${book.title}" moved to shelf ${shelfParser[shelf]}`
          });
        }
        // if callback exists the callback function works
      }
      return book;
    })
    .filter(book => book.shelf);
};
