import React, { Component } from "react";
import BookCard from "./BookCard";
// import Preloader from "./Preloader"; //disable es-lint
import SearchForm from "./SearchForm";
import {
  handleFetchedData,
  onlyUnique,
  addToLocalStorage,
  getDataFromLocalStorage
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
    const { booksFetched } = this.state;
    let newBookShelfData;
    if (booksFetched) {
      newBookShelfData = booksFetched
        .map(book => {
          if (book.id === id) {
            book.shelf = shelf;
          }
          return book;
        })
        .filter(book => book.shelf); //Filter the books for only shelved books
    }
    /*add Items to filterdShelve array which contains book with shelf property defined ["cr","r","toR"] and Removing the duplicates*/
    let filterdShelves = [
      ...this.state.filterdShelves,
      ...newBookShelfData
    ].filter(onlyUnique);
    console.log(filterdShelves);

    this.setState(
      { filterdShelves }, //Setting the state with new Filtered shelf arry
      () => addToLocalStorage("bookShelf", filterdShelves) // A callback for storing the data in local storage
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
        <div className="grid">
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
