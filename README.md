# Project-Tic-Tac-Toe
The Odin Project's Assignment: A Tic Tac Toe game you can play in your browser. 

** General Outline: **

1. HTML, CSS, JS setup. 

2. Store the gameboard as an array inside of a Gameboard object.       
    - Players are also stored in objects. 
    - An object to control the flow of the game. 
        + As few global code as possible. Tuck everything in a module or factory. (Ex: gameBoard, displayController modules; players in factories)

3. The webpage will first render the contents of the gameboard array. 
    
    - const gameBoard = [null, null, null, 
                         null, null, null, 
                         null, null, null];
    (3x3 board for now)
    - Use grid to place the each block.

4. Build the functions that allows players to add marks to a specific spot on the board, and then tie it to the DOM. Letting players click on the gameboard to place their maker. 
    - Prevent players from playing in spots that are already taken. (if (block === null)).
    - "X" is played right after the game has started. Check the gameBoard array, if "X" has more entries than "O", immediately set the next marker to be "O" and vice versa. 

5. Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie. 
    - Win pattern 1: 
    gameBoard = [   X,    X,    X, 
                 null,  null,   null, 
                 null,  null,   null];
     
    - Win pattern 2: 
    gameBoard = [   X,  null,   null, 
                    X,  null,   null, 
                    X,  null,   null];

    - Win pattern 3: 
    gameBoard = [   X,     null,   null, 
                    null,     X,   null, 
                    null,  null,      X ];
    - Tie pattern = !Win pattern1 and gameBoard.find(block => block === null) = undefined; 

6.  - Name input for two players. 
    - Start/Restart button. 
    - Winner congratulation notification. 
    - Scoreboard. 

7. Optional: Create an AI so that a player can play against it.


    
