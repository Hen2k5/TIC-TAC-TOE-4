let size = 3;

function initializeBoard() {
    size = parseInt(document.getElementById('size').value);
    const board = document.getElementById('board');
    board.innerHTML = '';

    const cells = [];
    let currentPlayer = 'X';
    let gameOver = false;

    for (let i = 0; i < size; i++) {
        const row = document.createElement('div'); 
        row.classList.add('row'); 

        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => cellClicked(cell.dataset.row, cell.dataset.col));
            cells.push(cell);
            row.appendChild(cell);
        }

        board.appendChild(row); 
    }

   
    function cellClicked(row, col) {
        if (!gameOver && !getCell(row, col)) {
            setCell(row, col, currentPlayer);
            if (checkWinner(currentPlayer)) {
                alert(currentPlayer + ' wins!');
                gameOver = true;
            } else if (checkDraw()) {
                alert('It\'s a draw!');
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

   
    function getCell(row, col) {
        return cells.find(cell => cell.dataset.row == row && cell.dataset.col == col).textContent;
    }

  
    function setCell(row, col, value) {
        cells.find(cell => cell.dataset.row == row && cell.dataset.col == col).textContent = value;
    }

 
    function checkWinner(player) {
        const lines = [];
       
        for (let i = 0; i < size; i++) {
            lines.push([]);
            for (let j = 0; j < size; j++) {
                lines[i].push({row: i, col: j});
            }
        }
      
        for (let j = 0; j < size; j++) {
            lines.push([]);
            for (let i = 0; i < size; i++) {
                lines[size + j].push({row: i, col: j});
            }
        }

        lines.push([]);
        lines.push([]);
        for (let i = 0; i < size; i++) {
            lines[2*size].push({row: i, col: i});
            lines[2*size + 1].push({row: i, col: size - i - 1});
        }

        return lines.some(line => line.every(cell => getCell(cell.row, cell.col) === player));
    }

  
    function checkDraw() {
        return cells.every(cell => cell.textContent !== '');
    }
}