document.addEventListener("DOMContentLoaded", function() {
    const team1NameInput = document.getElementById("team1-name");
    const team2NameInput = document.getElementById("team2-name");
    const team1Score = document.getElementById("team1-score");
    const team2Score = document.getElementById("team2-score");
    const team1Wins = document.getElementById("team1-wins");
    const team2Wins = document.getElementById("team2-wins");
    const addPointsBtn = document.getElementById("add-points");
    const teaseBtns = document.querySelectorAll(".tease");
    const roundsTableBody = document.getElementById("rounds-table-body");
    const team1Header = document.getElementById("team1-header");
    const team2Header = document.getElementById("team2-header");

    let team1ScoreValue = 0;
    let team2ScoreValue = 0;
    let team1WinsValue = 0;
    let team2WinsValue = 0;
    let rounds = [];
    let team1Name = "الفريق 1";
    let team2Name = "الفريق 2";

    let team1ScoreAfterThirdRound = null;
    let team2ScoreAfterThirdRound = null;

    function updateTeamNames() {
        team1Name = team1NameInput.value || "الفريق 1";
        team2Name = team2NameInput.value || "الفريق 2";
        team1Header.textContent = team1Name;
        team2Header.textContent = team2Name;
    }

    addPointsBtn.addEventListener("click", function() {
        updateTeamNames();
        
        const team1Points = parseInt(document.getElementById("team1-points").value) || 0;
        const team2Points = parseInt(document.getElementById("team2-points").value) || 0;

        team1ScoreValue += team1Points;
        team2ScoreValue += team2Points;

        team1Score.textContent = team1ScoreValue;
        team2Score.textContent = team2ScoreValue;

        rounds.push({ team1: team1Points, team2: team2Points });

        // تخزين النقاط بعد الجولة الثالثة
        if (rounds.length === 3) {
            team1ScoreAfterThirdRound = team1ScoreValue;
            team2ScoreAfterThirdRound = team2ScoreValue;
        }

        updateRoundsTable();

        document.getElementById("team1-points").value = "";
        document.getElementById("team2-points").value = "";

        checkWinner();
    });

    function checkWinner() {
        let winningTeam = null;

        if (team1ScoreValue >= 100 || team2ScoreValue >= 100) {
            if (team1ScoreValue > team2ScoreValue) {
                if (team1ScoreAfterThirdRound !== null && team1ScoreAfterThirdRound <= 26) {
                    team1WinsValue += 2;
                } else if (team2ScoreValue === 0) {
                    team1WinsValue += 2;
                } else {
                    team1WinsValue += 1;
                }
                winningTeam = team1Wins;
            } else if (team2ScoreValue > team1ScoreValue) {
                if (team2ScoreAfterThirdRound !== null && team2ScoreAfterThirdRound <= 26) {
                    team2WinsValue += 2;
                } else if (team1ScoreValue === 0) {
                    team2WinsValue += 2;
                } else {
                    team2WinsValue += 1;
                }
                winningTeam = team2Wins;
            }

            // إذا كانت النقاط متساوية ولاعب كل منهما أكثر من 99 نقطة، لا نفعل شيئًا ونستمر في اللعب
            if (winningTeam !== null) {
                flashWinningTeam(winningTeam);
                resetGame();
            }
        }
        team1Wins.textContent = `فوز: ${team1WinsValue}`;
        team2Wins.textContent = `فوز: ${team2WinsValue}`;
    }

    function resetGame() {
        team1ScoreValue = 0;
        team2ScoreValue = 0;
        rounds = [];

        team1ScoreAfterThirdRound = null;
        team2ScoreAfterThirdRound = null;

        team1Score.textContent = team1ScoreValue;
        team2Score.textContent = team2ScoreValue;

        updateRoundsTable();
        document.getElementById("team1-points").value = "";
        document.getElementById("team2-points").value = "";
    }

    function flashWinningTeam(element) {
        element.classList.add("flash");
        setTimeout(() => {
            element.classList.remove("flash");
        }, 1000);
    }

    teaseBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            updateTeamNames();
            
            const team = parseInt(btn.dataset.team);
            if (team === 1) {
                team1WinsValue += 7;
                flashWinningTeam(team1Wins);
            } else if (team === 2) {
                team2WinsValue += 7;
                flashWinningTeam(team2Wins);
            }
            team1Wins.textContent = `فوز: ${team1WinsValue}`;
            team2Wins.textContent = `فوز: ${team2WinsValue}`;
        });
    });

    function updateRoundsTable() {
        roundsTableBody.innerHTML = "";
        rounds.forEach(function(round, index) {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${index + 1}</td><td>${round.team1} (${team1Name})</td><td>${round.team2} (${team2Name})</td>`;
            roundsTableBody.appendChild(row);
        });
    }
});
