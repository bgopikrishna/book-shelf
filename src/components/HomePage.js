/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { getDataFromLocalStorage, addToLocalStorage } from '../helperFunctions';

import BookReadingComp from './BookReadingComp';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      bookShelf: {
        currentlyReading: [],
        toRead: [],
        read: [],
      },
      currentTab: 0,
    };
  }

  componentDidMount() {
    const books = getDataFromLocalStorage('bookShelf');
    if (books && books.length !== 0) {
      const currentlyReading = books.filter(book => book.shelf === 'cR');
      const toRead = books.filter(book => book.shelf === 'toR');
      const read = books.filter(book => book.shelf === 'r');

      this.setState({
        books,
        bookShelf: {
          currentlyReading,
          toRead,
          read,
        },
      });
    }
  }

  handleTab = tabIndex => {
    this.setState(state => ({ ...state, currentTab: tabIndex }));
  };
  addBookToShelf = (id, shelf) => {
    const { books } = this.state;
    let newBooks;
    if (books) {
      newBooks = books
        .map(book => {
          if (book.id === id) {
            book.shelf = shelf;
          }
          return book;
        })
        .filter(book => book.shelf);
    }
    const newCurrentlyReading = books.filter(book => book.shelf === 'cR');
    const newToRead = books.filter(book => book.shelf === 'toR');
    const newRead = books.filter(book => book.shelf === 'r');
    this.setState(
      {
        books: [...newBooks],
        bookShelf: {
          currentlyReading: newCurrentlyReading,
          toRead: newToRead,
          read: newRead,
        },
      },
      addToLocalStorage('bookShelf', books)
    );
  };
  //delete the book from the shelf
  deleteBookFromShelf = id => {
    let { books } = this.state;
    let newBooks = books.filter(book => book.id !== id);

    const newCurrentlyReading = newBooks.filter(book => book.shelf === "cR");
    const newToRead = newBooks.filter(book => book.shelf === "toR");
    const newRead = newBooks.filter(book => book.shelf === "r");
    this.setState(
      {
        books: [...newBooks],
        bookShelf: {
          currentlyReading: newCurrentlyReading,
          toRead: newToRead,
          read: newRead
        }
      },
      addToLocalStorage("bookShelf", newBooks)
    );
  };

  render() {
    const { bookShelf, currentTab } = this.state;
    const { currentlyReading, toRead, read } = bookShelf;
    const currentlyReadingJSX = (
      <BookReadingComp
        ifEmptyMsg="Currently you're not reading any book"
        readIngShelfData={currentlyReading}
        addBookToShelf={this.addBookToShelf}
        deleteBookFromShelf={this.deleteBookFromShelf}
      />
    );
    const readJSX = (
      <BookReadingComp
        ifEmptyMsg="You're not done yet"
        readIngShelfData={read}
        addBookToShelf={this.addBookToShelf}
        deleteBookFromShelf={this.deleteBookFromShelf}

      />
    );
    const toReadJSX = (
      <BookReadingComp
        ifEmptyMsg='Add Some Books to Read'
        readIngShelfData={toRead}
        addBookToShelf={this.addBookToShelf}
        deleteBookFromShelf={this.deleteBookFromShelf}

      />
    );

    return (
      // <div className="row">
      //   <h1 className="col s12 m12 l12 shelf-title">Currently Reading</h1>
      //   {currentlyReadingJSX}
      //   <h1 className="col s12 m12 l12 shelf-title">To Read</h1>
      //   {toReadJSX}
      //   <h1 className="col s12 m12 l12 shelf-title">Read </h1>
      //   {readJSX}
      // </div>
      <div className='row'>
        <div className='w-100'>
          <ul className='tabs'>
            <li className='tab col s4'>
              <a
                href='#'
                onClick={() => this.handleTab(0)}
                className={currentTab === 0 && 'active'}
              >
                Currently Reading
              </a>
            </li>
            <li className='tab col s4'>
              <a
                href='#'
                onClick={() => this.handleTab(1)}
                className={currentTab === 1 && 'active'}
              >
                To Read
              </a>
            </li>
            <li className='tab col s4'>
              <a
                href='#'
                onClick={() => this.handleTab(2)}
                className={currentTab === 2 && 'active'}
              >
                Read
              </a>
            </li>
          </ul>
        </div>
        {currentTab === 0 && currentlyReadingJSX}
        {currentTab === 1 && toReadJSX}
        {currentTab === 2 && readJSX}
      </div>
    );
  }
}

export default HomePage;

// {booksFetched &&
//     booksFetched.map(book => (
//       <BookCard
//         key={book.id}
//         book={book}
//         addBookToShelf={this.addBookToShelf}
//       />
//     ))}
