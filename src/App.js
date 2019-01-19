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
      },
      counter: 0
    };
  }
  handleCounter() {
    this.setState({
      counter: this.state.counter + 1
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Home count={this.state.counter} />}
            />
            <Route
              path="/search"
              component={() => (
                <SearchBooks handleCounter={this.handleCounter} />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const Home = ({ count }) => <div>Home {count}</div>;
export default App;
