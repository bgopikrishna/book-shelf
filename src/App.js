import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import SearchBooks from "./components/SearchBooksPage";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Page404 from "./components/Page404";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookShelf: {
        currentlyReading: [],
        toRead: [],
        read: []
      }
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/search" component={SearchBooks} />
            <Route path="/404" component={Page404} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
