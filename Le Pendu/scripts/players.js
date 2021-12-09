let players = new Array;
let joueur;

class Player {
    constructor(pseudo, win, played) {
        this.Pseudo = pseudo;
        this.Win = win;
        this.Played = played;
        this.Percentage = (this.Win / this.Played) * 100;
    }
}

function AddPlayer(Player) {
    const tablePlayers = document.getElementById("tblPlayers");
    const PlayerRow = document.createElement("TR");
    const PseudoCell = document.createElement("TD");
    PseudoCell.innerText = Player.Pseudo;
    const WinCell = document.createElement("TD");
    WinCell.innerText = Player.Win;
    const PlayedCell = document.createElement("TD");
    PlayedCell.innerText = Player.Played;
    const PercentageCell = document.createElement("TD");
    PercentageCell.innerText = (Player.Percentage).toPrecision(3) + "%";
    PlayerRow.appendChild(PseudoCell);
    PlayerRow.appendChild(WinCell);
    PlayerRow.appendChild(PlayedCell);
    PlayerRow.appendChild(PercentageCell);
    tablePlayers.appendChild(PlayerRow);
}

function ActuAffScore() {
    document.getElementById("tblPlayers").innerHTML = "<thead><tr><th colspan='4' id='top'>TOP 10</th>" +
        "</tr><tr><th> Pseudo </th><th> Parties gagnées </th><th> Parties jouées </th><th> Pourcentage de victoire </th>" +
        "</tr></thead><tbody></tbody>";
    for (let i = 0; i < Math.min(players.length, 10); i++) {
        AddPlayer(players[i]);
    }
}

function ActuTabScore(win) {
    let index = players.findIndex((player) => player.Pseudo == joueur.Pseudo);
    if (win == 1) {
        players[index].Win++;
    }
    players[index].Played++;
    players[index].Percentage = (players[index].Win / players[index].Played) * 100;
    players.sort(function(a,b) {
        if (b.Percentage != a.Percentage) {
            return b.Percentage - a.Percentage;
        } else {
            return b.Played - a.Played;
        }
    });
}
