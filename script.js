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
    const winsTableBody = document.getElementById("wins-table-body");
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

    function createEditButton(index) {
        const editButton = document.createElement("button");
        editButton.textContent = "تعديل";
        editButton.classList.add("edit-round");
        editButton.addEventListener("click", function() {
            editRound(index);
        });
        return editButton;
    }

    function editRound(index) {
        const round = rounds[index];
        const team1Points = prompt(`تعديل نقاط ${team1Name} للجولة ${index + 1}:`, round.team1);
        const team2Points = prompt(`تعديل نقاط ${team2Name} للجولة ${index + 1}:`, round.team2);

        if (team1Points !== null && team2Points !== null) {
            const team1PointsInt = parseInt(team1Points);
            const team2PointsInt = parseInt(team2Points);

            if (!isNaN(team1PointsInt) && !isNaN(team2PointsInt)) {
                // تحديث النقاط
                team1ScoreValue = team1ScoreValue - round.team1 + team1PointsInt;
                team2ScoreValue = team2ScoreValue - round.team2 + team2PointsInt;

                // تحديث الجولة في المصفوفة
                rounds[index] = { team1: team1PointsInt, team2: team2PointsInt };

                // تحديث النقاط على الشاشة
                team1Score.textContent = team1ScoreValue;
                team2Score.textContent = team2ScoreValue;

                // تحديث الجدول
                updateRoundsTable();
                checkWinner();
            }
        }
    }

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
                winningTeam = 1;
            } else if (team2ScoreValue > team1ScoreValue) {
                if (team2ScoreAfterThirdRound !== null && team2ScoreAfterThirdRound <= 26) {
                    team2WinsValue += 2;
                } else if (team1ScoreValue === 0) {
                    team2WinsValue += 2;
                } else {
                    team2WinsValue += 1;
                }
                winningTeam = 2;
            }
            updateWinsTable(winningTeam);
            resetGame();
        }

        team1Wins.textContent = `فوز: ${team1WinsValue}`;
        team2Wins.textContent = `فوز: ${team2WinsValue}`;

        if (winningTeam) {
            flashWinner(winningTeam);
        }
    }

    function flashWinner(team) {
        if (team === 1) {
            team1Wins.classList.add("flash");
            setTimeout(() => {
                team1Wins.classList.remove("flash");
            }, 1000);
        } else if (team === 2) {
            team2Wins.classList.add("flash");
            setTimeout(() => {
                team2Wins.classList.remove("flash");
            }, 1000);
        }
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

    teaseBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            updateTeamNames();
            
            const team = parseInt(btn.dataset.team);
            if (team === 1) {
                team1WinsValue += 7;
                flashWinner(1);
                updateWinsTable(1, true);
            } else if (team === 2) {
                team2WinsValue += 7;
                flashWinner(2);
                updateWinsTable(2, true);
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
            const editButtonCell = document.createElement("td");
            editButtonCell.appendChild(createEditButton(index));
            row.appendChild(editButtonCell);
            roundsTableBody.appendChild(row);
        });
    }

    function updateWinsTable(winningTeam, isTease = false) {
        const currentTime = new Date().toLocaleTimeString();
        const row = document.createElement("tr");

        if (winningTeam === 1) {
            row.innerHTML = `<td>${team1Name}</td><td>${currentTime}</td><td>${isTease ? 7 : team1WinsValue}</td>`;
        } else if (winningTeam === 2) {
            row.innerHTML = `<td>${team2Name}</td><td>${currentTime}</td><td>${isTease ? 7 : team2WinsValue}</td>`;
        }

        winsTableBody.appendChild(row);
    }
});
