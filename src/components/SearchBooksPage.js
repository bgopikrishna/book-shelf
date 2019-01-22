import React, { Component } from "react";
import BookCard from "./BookCard";
// import Preloader from "./Preloader"; //disable es-lint
import SearchForm from "./SearchForm";
import {
  handleFetchedData,
  onlyUnique,
  addToLocalStorage,
  getDataFromLocalStorage,
  bookShelfManager
} from "../helperFunctions";

const URL = "https://www.googleapis.com/books/v1/volumes?";
const APIkey = "&key=AIzaSyCjLjUcPmkq5G13-QZ2Ro7ugoDJNbTOVnA";

class SearchBooksPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: [],
      searchField: "",
      booksFetched: [],
      error: null,
      loading: true,
      filterdShelves: []
    };
  }

  //Handling the changes in the input search field
  handleChange = e => {
    this.setState({
      searchField: e.target.value
    });
  };

  //Performing the serach with the keywork
  handleSubmit = e => {
    e.preventDefault();
    this.fetchBooks();
  };

  //Fetching Books
  fetchBooks = () => {
    const { searchField } = this.state;
    fetch(`${URL} + &q="${searchField}"${APIkey}`)
      .then(res => res.json())
      .then(data => {
        //Parsing the Fetched Data from the api
        const newBooks = handleFetchedData(data.items);

        this.setState({
          booksFetched: [...newBooks],
          loading: false
        });
      })
      .catch(error => this.setState({ error }));
  };
  addBookToShelf = (id, shelf) => {
    let { booksFetched, filterdShelves } = this.state;
    let newBookShelfData;
    let isBookInShelfFlag = false; //A simple flag to check if the book is already present in the user shelves
    //Checking if the book is already available in the shelf
    let isBookInShelf = filterdShelves.filter(book => book.id === id);
    if (isBookInShelf.length !== 0) {
      isBookInShelfFlag = true;
    }
    //IF the book did't exist this will run
    if (booksFetched && !isBookInShelfFlag) {
      newBookShelfData = bookShelfManager(booksFetched, id, shelf); //Filter the books for only shelved books
    }
    //If the book already exists in the shelf , this condition will which will add to normal shelf
    else {
      newBookShelfData = bookShelfManager(filterdShelves);
    }
    // To change the status of the booksFetched books(items in array) so that it shows in UI buttons(toRead, read, Currently Reading)
    booksFetched = bookShelfManager(booksFetched, id, shelf, true);

    /*add Items to filterdShelve array which contains book with shelf property defined ["cr","r","toR"] and Removing the duplicates*/
    let newfilterdShelves = [
      ...this.state.filterdShelves,
      ...newBookShelfData
    ].filter(onlyUnique);
    // console.log(newfilterdShelves);

    this.setState(
      { filterdShelves: newfilterdShelves }, //Setting the state with new Filtered shelf arry
      () => addToLocalStorage("bookShelf", newfilterdShelves) // A callback for storing the data in local storage
    );
  };

  //getting data from local storage when compnent mounts
  componentDidMount() {
    let localBooksData = getDataFromLocalStorage("bookShelf");
    if (localBooksData) {
      localBooksData = localBooksData.filter(onlyUnique);
      this.setState({
        filterdShelves: [...localBooksData]
      });
    }
  }
  //Rendering the Component
  render() {
    const { searchField, booksFetched } = this.state;

    return (
      <div className="search-page">
        <SearchForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          searchField={searchField}
        />
        <div className="row">
          {booksFetched &&
            booksFetched.map(book => (
              <BookCard
                key={book.id}
                book={book}
                addBookToShelf={this.addBookToShelf}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default SearchBooksPage;
