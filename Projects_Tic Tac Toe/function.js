let currentPlayer ="X";
let gameActive=true;

function  printCurrentPlayerTurn(){
    return `It's ${currentPlayer}'s turn`;
}

function printWinningPlayer(){
    return `player ${currentPlayer} has won`;
}

const statusPanel= document.getElementById('status');
statusPanel.innerHTML = printCurrentPlayerTurn();
document.getElementById('restart').addEventListener('click', handleRestartClick);

function handleRestartClick(){
    gameActive=true;
    currentPlayer="X";
    statusPanel.innerHTML = printCurrentPlayerTurn();
    Array.prototype.forEach.call(document.getElementsByClassName('cell'),(item) =>item.innerHTML= '');
}

const winningConditions =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

let cellButtons = document.getElementsByClassName('cell');
for (cellButton of cellButtons){
    cellButton.addEventListener('click',handleCellClick);
}

function handlePlayerChange(){
    if (gameActive==false)
    return;
    currentPlayer= currentPlayer=== "X" ? "O" : "X";
    statusPanel.innerHTML = printCurrentPlayerTurn();
}

function handleGameWinnerCheck(){
    for (let i=0; i<8; i++){
        const winningCondition =winningConditions[i];
        let cell1 =document.getElementById(winningCondition[0].toString()).innerHTML;
        let cell2 =document.getElementById(winningCondition[1].toString()).innerHTML;
        let cell3 =document.getElementById(winningCondition[2].toString()).innerHTML;
        if (cell1==='' || cell2==='' || cell3===''){
            continue;
        }
        if (cell1=== cell2 && cell2=== cell3) {
            console.log("winner is player " + currentPlayer);
            statusPanel.innerHTML= printWinningPlayer();
            
            gameActive=false;
            return;
        }
    }
    let roundDraw =Array.prototype.filter.call(document.getElementsByClassName('cell'),
        (item)=>item.innerHTML=== '').lenth===0;
        if (roundDraw){
            statusPanel.innerHTML ="Game is Draw";
            gameActive=false;
        }
}
function handleCellClick(event){
    let clickedCell=event.target;
    if ((clickedCell.innerHTML!== "")||(gameActive==false)){
        return;
    }
    clickedCell.innerHTML= currentPlayer;
    handleGameWinnerCheck();
    handlePlayerChange();
    
}