import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import SearchBooks from "./components/SearchBooks";
import Navbar from "./components/Navbar";

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
            <Route exact path="/" component={Home} />
            <Route path="/search" component={SearchBooks} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const Home = () => <div>Home</div>;
export default App;
