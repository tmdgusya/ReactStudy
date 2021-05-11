import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
      value = { this.props.squares[i] }
      onClick = {() => this.props.onClick(i)}
      />;
  }

  render() {
    return (
      <div>
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
        <Page />
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history : [{
        squares: Array(9).fill(null)
      }],
      xIsNext : true
    }
  }

  render() {
    const history = this.state.history;
    // currently history
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if(winner) {
      status = 'Winner : ' + winner;
    } else { 
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }

  handleClick(i) {
    // Copy squares array 
    // Copy 배열을 쓰는 이유는 상태 변화가 일어날때 마다 render 될 수 있으므로 
    // 복사 배열을 사용한다.
    const history = this.state.history;
    const current = history[history.length - 1]
    const squares = current.squares.slice();

    if(calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState(
        {
          history : history.concat(
            [{
              squares : squares
            }]
          ),
          xIsNext : !this.state.xIsNext
        }
      )
  }

}

class Page extends React.Component {

  constructor(props) {
    super(props)
    this.state = {pageBar : ['<<', 1, 2, 3, 4, 5, '>>']}
  }

  render() {

    const pageMenu = this.state.pageBar.map((pageNum) => 
      <li key={pageNum.toString()}>
        <a href={"id="+pageNum}>{pageNum}</a>
      </li>
    );

    return (
      <div className='page_bar'>
        <ul id='page_group'>
          {pageMenu}
        </ul>
      </div>
    );
  }

}

class PageUpButton extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    <li></li>
  }

}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
