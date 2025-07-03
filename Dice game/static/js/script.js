document.addEventListener("DOMContentLoaded", function () {
    const rollButton = document.getElementById("roll-btn");
    const resetButton = document.getElementById("reset-btn");
    const diceImage = document.getElementById("dice");
    const resultText = document.getElementById("result-text");
    const turnIndicator = document.getElementById("turn-indicator");

    const player1ScoreDisplay = document.getElementById("player1-score");
    const player2ScoreDisplay = document.getElementById("player2-score");

    let player1Score = 0;
    let player2Score = 0;
    let currentPlayer = 1;
    let rolls = { 1: null, 2: null };

    rollButton.addEventListener("click", function () {
        diceImage.style.animation = "roll 1s ease-in-out"; // Start rolling animation
    
        setTimeout(() => {
            fetch(`/roll-dice?nocache=${new Date().getTime()}`) // Prevent caching
                .then(response => response.json())
                .then(data => {
                    diceImage.style.animation = "none"; // Stop animation
                    diceImage.src = `/static/images/dice${data.result}.png`; // Show result
                    resultText.innerHTML = `🎲 Player ${currentPlayer} rolled: <strong>${data.result}</strong>`;
    
                    rolls[currentPlayer] = data.result;
    
                    if (currentPlayer === 1) {
                        currentPlayer = 2;
                        turnIndicator.innerText = "Player 2's Turn";
                    } else {
                        setTimeout(determineWinner, 500); // Delay result to ensure Player 2’s roll is considered
                        currentPlayer = 1;
                        turnIndicator.innerText = "Player 1's Turn";
                    }
                });
        }, 1000); // Delay ensures dice animation completes
    });
    

    function determineWinner() {
        let roll1 = rolls[1];
        let roll2 = rolls[2];
    
        if (roll1 > roll2) {
            player1Score++;
            alert("🎉 Player 1 Wins This Round!");
        } else if (roll2 > roll1) {
            player2Score++;
            alert("🎉 Player 2 Wins This Round!");
        } else {
            alert("🤝 It's a Tie!");
        }
    
        // Update scoreboard
        player1ScoreDisplay.innerText = player1Score;
        player2ScoreDisplay.innerText = player2Score;
    
        // Reset rolls for the next round
        rolls = { 1: null, 2: null };
    }
    
    resetButton.addEventListener("click", function () {
        // Reset everything
        player1Score = 0;
        player2Score = 0;
        rolls = { 1: null, 2: null };
        currentPlayer = 1;
    
        // Reset UI elements
        player1ScoreDisplay.innerText = "0";
        player2ScoreDisplay.innerText = "0";
        turnIndicator.innerText = "Player 1's Turn";
        resultText.innerHTML = "Roll the dice to start!";
        diceImage.src = "/static/images/dice1.png"; // Default dice image
    
        alert("🔄 Game has been reset!");
    });
    
});
