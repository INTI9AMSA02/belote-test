document.addEventListener("DOMContentLoaded", function() {
    const team1Score = document.getElementById("team1-score");
    const team2Score = document.getElementById("team2-score");
    const team1Wins = document.getElementById("team1-wins");
    const team2Wins = document.getElementById("team2-wins");
    const addPointsBtn = document.getElementById("add-points");
    const teaseBtns = document.querySelectorAll(".tease");
    const roundsTableBody = document.getElementById("rounds-table-body");

    let team1ScoreValue = 0;
    let team2ScoreValue = 0;
    let team1WinsValue = 0;
    let team2WinsValue = 0;
    let rounds = [];

    addPointsBtn.addEventListener("click", function() {
        const team1Points = parseInt(document.getElementById("team1-points").value) || 0;
        const team2Points = parseInt(document.getElementById("team2-points").value) || 0;

        team1ScoreValue += team1Points;
        team2ScoreValue += team2Points;

        team1Score.textContent = team1ScoreValue;
        team2Score.textContent = team2ScoreValue;

        rounds.push({ team1: team1Points, team2: team2Points });
        updateRoundsTable();

        document.getElementById("team1-points").value = "";
        document.getElementById("team2-points").value = "";

        checkWinner();
    });

    function checkWinner() {
        if (team1ScoreValue >= 100) {
            if (team2ScoreValue === 0) {
                team1WinsValue += 2;
            } else {
                team1WinsValue += 1;
            }
            resetGame();
        } else if (team2ScoreValue >= 100) {
            if (team1ScoreValue === 0) {
                team2WinsValue += 2;
            } else {
                team2WinsValue += 1;
            }
            resetGame();
        }
        team1Wins.textContent = `Wins: ${team1WinsValue}`;
        team2Wins.textContent = `Wins: ${team2WinsValue}`;
    }

    function resetGame() {
        team1ScoreValue = 0;
        team2ScoreValue = 0;
        rounds = [];

        team1Score.textContent = team1ScoreValue;
        team2Score.textContent = team2ScoreValue;

        updateRoundsTable();
        document.getElementById("team1-points").value = "";
        document.getElementById("team2-points").value = "";
    }

    teaseBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const team = parseInt(btn.dataset.team);
            if (team === 1) {
                team1WinsValue += 7;
            } else if (team === 2) {
                team2WinsValue += 7;
            }
            team1Wins.textContent = `Wins: ${team1WinsValue}`;
            team2Wins.textContent = `Wins: ${team2WinsValue}`;
        });
    });

    function updateRoundsTable() {
        roundsTableBody.innerHTML = "";
        rounds.forEach(function(round, index) {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${index + 1}</td><td>${round.team1}</td><td>${round.team2}</td>`;
            roundsTableBody.appendChild(row);
        });
    }
});
