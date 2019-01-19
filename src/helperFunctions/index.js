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
      pageCount: book.volumeInfo.pageCount
    };
  });

  return fetchedBooks;
};
