import React, { Component } from "react";
import BookCard from "./BookCard";
import Preloader from "./Preloader";
import SearchForm from "./SearchForm";
import { handleFetchedData } from "../helperFunctions";

const URL = "https://www.googleapis.com/books/v1/volumes?";
const APIkey = "&key=AIzaSyCjLjUcPmkq5G13-QZ2Ro7ugoDJNbTOVnA";

class SearchBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: [],
      searchField: "",
      booksFetched: [],
      error: null,
      loading: true
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
                handleCounter={this.props.handleCounter}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default SearchBooks;

// {
//   /* <form>
//         <div className="input-field">
//           <input id="search" type="search" required>
//           <label className="label-icon" for="search"><i className="material-icons">search</i></label>
//           <i className="material-icons">close</i>
//         </div>
//       </form> */
// }
