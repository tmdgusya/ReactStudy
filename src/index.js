import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

/**
 * React 는 state 를 props 를 통해서 공유가 가능하다!
 */

class Square extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value : null
    };
  }

  render() {
    return (
      <button 
        className = "square"
        onClick = { 
          () => this.props.onClick()
         }
      >
          {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares : Array(9).fill(null),
      xIsNext : true
    };
  }


  renderSquare(i) {
    return <Square 
      value = { this.state.squares[i] }
      onClick = {() => this.handleClick(i)}
      />;
  }

  handleClick(i) {
    // Copy squares array 
    // Copy 배열을 쓰는 이유는 상태 변화가 일어날때 마다 render 될 수 있으므로 
    // 복사 배열을 사용한다.
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState(
        {
          squares : squares,
          xIsNext : !this.state.xIsNext
        }
      )
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
