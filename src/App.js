import React, { Component } from 'react';
import logo from './logo.svg';
import {makeMove, isSolved, initGame, shuffle} from './game';
import './App.css';

class Game extends Component {
    state = {
      data: shuffle(initGame(4, 4))
    };

    startGame(){
      this.setState({data: shuffle(initGame(4, 4))});
    }

    makeMove(row, column) {
      if (!isSolved(this.state.data)) {
        this.setState({data: makeMove(this.state.data, row, column)});
      }
    }

    componentDidUpdate() {
      if (isSolved(this.state.data)) {
        setTimeout(() => {
          alert('כל הכבוד!');
          this.startGame();
        }, 100);
      }
    }

    render() {
      return (
        <div>
          <span className="NewGame" role="img" aria-label="New Game" onClick={() => this.startGame()}>🔄</span>
          <table><tbody>{this.state.data.map((x, row) => <tr key={row}>{x.map((y, column) => {
            return <td key={column} onClick={() => this.makeMove(row, column)} className={y ? 'cell' : 'empty'}>{y}</td>;
          })}</tr>)}</tbody></table>
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
        <Game/>
      </div>
    );
  }
}

export default App;
