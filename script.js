const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

//1st
let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//2nd created a function to initialize the game at the start or during new game
function initGame()
{
    currentPlayer = "X";

    gameGrid = ["","","","","","","","",""];

    //UI ko update kardo i.e empty kardo
    boxes.forEach((box,index)=>
    {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        //initialise box with its default css properties again
        box.classList = `box box${index+1}`;
    })

    newGameBtn.classList.remove("active");

    //UI pr current player show karne keliye
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

//function call
initGame();

//3rd
// applying event listener on all boxes using for each loop
// note that , "forEach" loop always execute a function inside its parameter
// we can create the function outside as well and call it in parameter of forEach loop

boxes.forEach((box , index)=>{
    box.addEventListener("click" , ()=>{
        handleClick(index);
    })
});

//4th 
function handleClick(index)
{
    if(gameGrid[index]==="") //this condition also perform un-clickable functionality
    {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        //pointer none kardo oos box ka , (means if pointer event is none, then that box is not clickable)
        boxes[index].style.pointerEvents="none";

        //now switch to opponents turn
        swapTurn();

        //check koi jeeta hai kya
        checkGameOver();
    }
}

//5th
function swapTurn()
{
    if(currentPlayer === "X")
    {
        currentPlayer = "O";
    }
    else
    {
        currentPlayer = "X";
    }

    // updating UI of current player
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

//6th
newGameBtn.addEventListener("click", initGame);

//7th
function checkGameOver()
{
    let answer = "";

    winningPositions.forEach((position)=>
    {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "")
              && (gameGrid[position[0]] === gameGrid[position[1]]) && gameGrid[position[1]] === gameGrid[position[2]])
            {
                //check if winner is X
                if(gameGrid[position[0]] === "X")
                   answer = "X";
                else
                {
                    answer = "O";
                }

                //disable further click i.e pointer events
                boxes.forEach((box)=>
                {
                    box.style.pointerEvents = "none";
                });

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    // means we have got the winner
    if(answer !== "")
    {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //No winner found ,let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box)=>
    {
        if(box !== "")
           fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}