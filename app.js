const boardSize = 3; // 3x3 board

document.getElementById('reset-btn').addEventListener('click', () => {
  tictactoe.initialize();
})

const tictactoe = (size) => {
  const newElem = (t) => { return document.createElement(t); };
  const getCoord = (id) => { return { x: id % size, y: Math.floor(id / size) }; };

  tictactoe.size = size || 3;

  tictactoe.board = {
    started: false,
    currentTurn: 'x',
    boxes: [],
    winners: {
      x: 0,
      o: 0
    }
  };

  tictactoe.initialize = () => {
    document.getElementById('board').innerHTML = '';

    for (let r = 0; r < size; ++r) {
      let tr = newElem('tr');
      document.getElementById('board').appendChild(tr);
      tictactoe.board.boxes[r] = [];

      for (let c = 0; c < size; ++c) {
        let td = newElem('td');
        tr.appendChild(td);
      }
    }

    document.querySelectorAll('td').forEach((td, i) => {
      td.id = `box-${i}`;
      let { x, y } = getCoord(i);
      tictactoe.board['boxes'][y][x] = '';

      td.addEventListener('click', (e) => {
        if (tictactoe.board.started) {
          tictactoe.boxClicked(e.target.id, x, y);
          tictactoe.checkForVictory(x, y);
        }
      });
    });

    tictactoe.board.currentTurn = 'x';
    tictactoe.board.started = true;
  }


  tictactoe.endGame = (winner,) => {
    // prevent moves
    tictactoe.board.started = false;
    tictactoe.board.currentTurn = '';
    document.getElementById('current-turn').innerText = '';
    // tracks wins
    tictactoe.board.winners[winner]++;
    document.getElementById('x-wins').innerText = tictactoe.board.winners.x;
    document.getElementById('o-wins').innerText = tictactoe.board.winners.o;
  }

  tictactoe.checkForVictory = (x, y) => {
    // vertical win
    if (tictactoe.board.boxes.reduce((m, i) => m ? (i[x] === tictactoe.board.boxes[0][x]) : false, true)) {
      tictactoe.endGame(tictactoe.board.boxes[0][x]);
    } else if (tictactoe.board.boxes[y].reduce((m, i) => m ? (i === tictactoe.board.boxes[y][0]) : false, true)) { // horizontal win
      tictactoe.endGame(tictactoe.board.boxes[y][0]);
    } else if (tictactoe.board.boxes[0][0] && tictactoe.board.boxes.reduce((m, r, i) => m ? (r[i] === tictactoe.board.boxes[0][0]) : false, true)) { // major diag win
      tictactoe.endGame(tictactoe.board.boxes[0][0]);
    } else if (tictactoe.board.boxes[size - 1][0] && tictactoe.board.boxes.reduce((m, r, i) => m ? (r[size - 1 - i] === tictactoe.board.boxes[size - 1][0]) : false, true)) {
      tictactoe.endGame(tictactoe.board.boxes[size - 1][0]);
    }
  };

  tictactoe.boxClicked = (boxId, x, y) => {
    if (tictactoe.board.boxes[y][x] === '') {
      tictactoe.board.boxes[y][x] = tictactoe.board.currentTurn;
      tictactoe.board.currentTurn = tictactoe.board.currentTurn === 'x' ? 'o' : 'x';
      document.getElementById(boxId).innerText = tictactoe.board.boxes[y][x];
      document.getElementById('current-turn').innerText = tictactoe.board.currentTurn;
    }
  };

  document.getElementById('current-turn').innerText = tictactoe.board.currentTurn;
  document.getElementById('x-wins').innerText = tictactoe.board.winners.x;
  document.getElementById('o-wins').innerText = tictactoe.board.winners.o;
  tictactoe.initialize();
};

tictactoe(boardSize);