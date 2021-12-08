let count;
let Nb;
let players = new Array;
let joueur;

function EndGame(win) {
    ActuTabScore(win);
    document.getElementById("tblPlayers").innerHTML = "";
    document.getElementById("allumettes").innerHTML = "";
    ActuAffScore();
    document.getElementById("info_jeu").style.display = "block";
    document.getElementById("jeu").style.display = "none";
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

function ActuAffScore() {
    document.getElementById("tblPlayers").innerHTML = "<thead><tr><th colspan='4' style='color: yellow;'>TOP 10</th>" +
        "</tr><tr><th> Pseudo </th><th> Parties gagnées </th><th> Parties jouées </th><th> Pourcentage de victoire </th>" +
        "</tr></thead><tbody></tbody>";
    for (let i = 0; i < Math.min(players.length, 10); i++) {
        AddPlayer(players[i]);
    }
}

function Random(p) {
    let rand = Math.floor(Math.random() * p) + 1;
    return rand;
}

function Enlever() {
    if (document.getElementById("one").checked) {
        Enlever1();
    } else if (document.getElementById("two").checked) {
        Enlever2();
    } else {
        Enlever3();
    }
    if (document.getElementById("easy").checked) {
        Tour_ordi_easy();
    } else if (document.getElementById("hard").checked) {
        Tour_ordi_hard();
    } else {
        Tour_ordi_inter();
    }
}

function Enlever1() {
    count++;
    Nb--;
    document.getElementById("allumettes").removeChild(document.getElementById(`${count}`));
    document.getElementById("nb_allumettes").innerText = `Il reste ${Nb} allumettes`;
}

function Enlever2() {
    for (let i = 1; i < 3; i++) {
        count++;
        Nb--;
        document.getElementById("allumettes").removeChild(document.getElementById(`${count}`));
    }
    document.getElementById("nb_allumettes").innerText = `Il reste ${Nb} allumettes`;
}

function Enlever3() {
    for (let i = 1; i < 4; i++) {
        count++;
        Nb--;
        document.getElementById("allumettes").removeChild(document.getElementById(`${count}`));
    }
    document.getElementById("nb_allumettes").innerText = `Il reste ${Nb} allumettes`;
}

function Tour_ordi_easy() {
    let x;
    let win;
    if (Nb == 1) {
        alert("Vous avez gagné, BRAVO !!");
        win = 1;
        EndGame(win);
    } else if (Nb == 2) {
        x = Random(2);
        if (x == 1) {
            alert("L'ordi enlève 1 allumette. Vous avez perdu, dommage ...");
            win = 0;
            EndGame(win);
        } else {
            alert("L'ordi enlève 2 allumettes. Vous avez gagné, BRAVO !!");
            win = 1;
            EndGame(win);
        }
    } else if (Nb == 3) {
        x = Random(3);
        if (x == 1) {
            Enlever1();
        } else if (x == 2) {
            alert("L'ordi enlève 2 allumettes. Vous avez perdu, dommage ...");
            win = 0;
            EndGame(win);
        } else {
            alert("L'ordi enlève 3 allumettes. Vous avez gagné, BRAVO !!");
            win = 1;
            EndGame(win);
        }
    } else if (Nb == 4) {
        x = Random(3);
        if (x == 3) {
            alert("L'ordi enlève 3 allumettes. Vous avez perdu, dommage ...");
            win = 0;
            EndGame(win);
        } else if (x == 1) {
            alert("L'ordi enlève 1 allumette.");
            Enlever1();
        } else {
            alert("L'ordi enlève 2 allumettes.");
            Enlever2();
        }
    } else {
        x = Random(3);
        if (x == 1) {
            alert("L'ordi enlève 1 allumette.");
            Enlever1();
        } else if (x == 2) {
            alert("L'ordi enlève 2 allumettes.");
            Enlever2();
        } else {
            alert("L'ordi enlève 3 allumettes.");
            Enlever3();
        }
    }
}

function Tour_ordi_hard() {
    let x;
    let win;
    if (Nb == 1) {
        alert("Vous avez gagné, BRAVO !!");
        win = 1;
        EndGame(win);
    } else if (Nb == 2) {
        alert("L'ordi enlève 1 allumette. Vous avez perdu, dommage ...");
        win = 0;
        EndGame(win);
    } else if (Nb == 3) {
        alert("L'ordi enlève 2 allumettes. Vous avez perdu, dommage ...");
        win = 0;
        EndGame(win);
    } else if (Nb == 4) {
        alert("L'ordi enlève 3 allumettes. Vous avez perdu, dommage ...");
        win = 0;
        EndGame(win);
    } else {
        if (Nb % 4 == 1) {
            x = Random(3);
            if (x == 1) {
                alert("L'ordi enlève 1 allumette.");
                Enlever1();
            } else if (x == 2) {
                alert("L'ordi enlève 2 allumettes.");
                Enlever2();
            } else if (x == 3) {
                alert("L'ordi enlève 3 allumettes.");
                Enlever3();
            }
        } else if (Nb % 4 == 2) {
            alert("L'ordi enlève 1 allumette.");
            Enlever1();
        } else if (Nb % 4 == 3) {
            alert("L'ordi enlève 2 allumettes.");
            Enlever2();
        } else if (Nb % 4 == 0) {
            alert("L'ordi enlève 3 allumettes.");
            Enlever3();
        }
    }
}

function Tour_ordi_inter() {
    if (Math.floor(Math.random()) == 0) {
        Tour_ordi_easy();
    } else {
        Tour_ordi_hard();
    }
}

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

function AffJeu() {
    for (let i = 0; i < 21; i++) {
        let image = new Image();
        image.src = 'Images/une_allumette.jpg';
        image.id = i;
        document.getElementById("allumettes").appendChild(image);
    }
    document.getElementById("nb_allumettes").innerText = "Il reste 21 allumettes";
}

function Init_Nim() {
    if (document.getElementById("pseudo").value == "") {
        alert("Veuillez indiquer votre pseudo ;-)");
    } else {
        document.getElementById("jeu").style.display = "block";
        joueur = new Player(document.getElementById("pseudo").value, 0, 0);
        if (!(players.find(player => player.Pseudo==joueur.Pseudo))) {
            players.push(joueur);
        }
        count=0;
        Nb=21;
        document.getElementById("info_jeu").style.display = "none";
        AffJeu();
        if (document.getElementById("no").checked) {
            if (document.getElementById("easy").checked) {
                Tour_ordi_easy();
            } else if (document.getElementById("hard").checked) {
                Tour_ordi_hard();
            } else {
                Tour_ordi_inter();
            }
        }
    }
}