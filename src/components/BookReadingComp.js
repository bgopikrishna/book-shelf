import React from 'react';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

const BookReadingComp = ({ readIngShelfData, ifEmptyMsg, addBookToShelf }) => {
  const emptyShelfMessage = (
    <div className='col s12 m12 l12 shelf-title'>
      <h2>{ifEmptyMsg}</h2>
      <p>
        Pick a book from <Link to='/search'>Here</Link>
      </p>
    </div>
  );

  const booksList = (
    <div className='grid'>
      {readIngShelfData.map(book => (
        <BookCard key={book.id} book={book} addBookToShelf={addBookToShelf} />
      ))}
    </div>
  );


  

  const renderBooks =
    readIngShelfData.length !== 0 ? booksList : emptyShelfMessage;

  return renderBooks;
};

export default BookReadingComp;
