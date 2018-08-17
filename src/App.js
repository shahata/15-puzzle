import React, { Component } from 'react';
import logo from './logo.svg';
import {makeMove, shuffle, isSolved, initGame} from './game';
import './App.css';

class Game extends Component {
    constructor(props) {
      super(props);
      this.state = {
        started: false,
        data: initGame(4, 4)
      };
    }

    startGame(){
      alert('מתחילים');
      this.setState({started: true});
      this.setState({data: shuffle(this.state.data)});
    }

    makeMove(row, column) {
      this.setState(makeMove(this.state.data, row, column));
    }

    componentDidUpdate() {
      if (isSolved(this.state.data)) {
        setTimeout(() => {
          alert('כל הכבוד!');
          this.setState({started: false, data: shuffle(this.state.data)});
        }, 100);
      }
    }

    render() {
      return (
        <div>
          <button onClick={() => this.startGame()}>שלום</button>
          {this.state.started ? <table>{this.state.data.map((x, row) => <tr>{x.map((y, column) => {
            return <td onClick={() => this.makeMove(row, column)}>{y}</td>;
          })}</tr>)}</table> : null}
        </div>
      )
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">פאזל 15</h1>
        </header>
        <p className="App-intro">
          דרור תלמי
        </p>
        <Game/>
      </div>
    );
  }
}

export default App;
