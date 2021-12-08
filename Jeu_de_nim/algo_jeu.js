let count;
let Nb;
let playersNim = new Array;
let joueur;

function EndGame(win) {
    ActuTabScore(win);
    document.getElementById("tblplayersNim").innerHTML = "";
    document.getElementById("allumettes").innerHTML = "";
    ActuAffScore();
    document.getElementById("info_jeu").style.display = "block";
    document.getElementById("jeu").style.display = "none";
}

function ActuTabScore(win) {
    let index = playersNim.findIndex((player) => player.Pseudo == joueur.Pseudo);
    if (win == 1) {
        playersNim[index].Win++;
    }
    playersNim[index].Played++;
    playersNim[index].Percentage = (playersNim[index].Win / playersNim[index].Played) * 100;
    playersNim.sort(function(a,b) {
        if (b.Percentage != a.Percentage) {
            return b.Percentage - a.Percentage;
        } else {
            return b.Played - a.Played;
        }
    });
    localStorage.setItem("playersNim", JSON.stringify(playersNim));
}

function ActuAffScore() {
    document.getElementById("tblplayers").innerHTML = "<thead><tr><th colspan='4'><span id='top'> TOP 10 </span>"+
        "</th></tr><tr><th> Pseudo </th><th> Parties gagnées </th><th> Parties jouées </th><th> Pourcentage de victoire </th>"+
        "</tr></thead><tbody></tbody>";
    for (let i = 0; i < Math.min(playersNim.length, 10); i++) {
        AddPlayer(playersNim[i]);
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
    const tableplayersNim = document.getElementById("tblplayers");
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
    tableplayersNim.appendChild(PlayerRow);
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

function LoadplayersNimRanking()
{
    playersNim=JSON.parse(localStorage.getItem("playersNim")||"[]");
    ActuAffScore();
}

LoadplayersNimRanking();

function Init_Nim() {
    if (document.getElementById("pseudo").value == "") {
        alert("Veuillez indiquer votre pseudo ;-)");
    } else {
        document.getElementById("jeu").style.display = "block";
        joueur = new Player(document.getElementById("pseudo").value, 0, 0);
        if (!(playersNim.find(player => player.Pseudo==joueur.Pseudo))) {
            playersNim.push(joueur);
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
