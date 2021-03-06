let userChoice;
let final;
let playersShifumi = new Array;
let joueur;
let Jeux = new Array;
let partie;

class Game {
    constructor(pseudo, choixjoueur, choixordi, resultat) {
        this.Pseudo = pseudo;
        this.ChoixJoueur = choixjoueur;
        this.ChoixOrdi = choixordi;
        this.Resultat = resultat;
    }
}

function AffGame(partie) {
    const NomJoueur = partie.Pseudo;
    const TableHist = document.getElementById("HistoriqueSelec");
    const ligne = document.createElement("tr");
    const choix = partie.ChoixJoueur;
    const fin = partie.ChoixOrdi;

    const cellulenom = document.createElement("td");
    cellulenom.innerText = NomJoueur;
    ligne.appendChild(cellulenom);

    const cellulechoix = document.createElement("td");
    cellulechoix.innerText = choix;
    ligne.appendChild(cellulechoix);

    const cellulefin = document.createElement("td");
    cellulefin.innerText = fin;
    ligne.appendChild(cellulefin);

    const celluleres = document.createElement("td");
    if (partie.Resultat == 0) {
        celluleres.style.backgroundColor = "yellow";
    }
    else if (partie.Resultat == 1) {
        celluleres.style.backgroundColor = "green";
    }
    else if (partie.Resultat == 2) {
        celluleres.style.backgroundColor = "red";
    }
    ligne.appendChild(celluleres);
    TableHist.appendChild(ligne);
}

class Player {
    constructor(pseudo, win, played) {
        this.Pseudo = pseudo;
        this.Win = win;
        this.Played = played;
        this.Percentage = (this.Win / this.Played) * 100;
    }
}

function ActuTabScore(final) {
    let index = playersShifumi.findIndex((player) => player.Pseudo == joueur.Pseudo);
    if (final == 1) {
        playersShifumi[index].Win++;
    }
    playersShifumi[index].Played++;
    playersShifumi[index].Percentage = (playersShifumi[index].Win / playersShifumi[index].Played) * 100;
    playersShifumi.sort(function (a, b) {
        if (b.Percentage != a.Percentage) {
            return b.Percentage - a.Percentage;
        } else {
            return b.Played - a.Played;
        }
    });
    localStorage.setItem("playersShifumi", JSON.stringify(playersShifumi));
}

function LoadplayersShifumiRanking() {
    playersShifumi = JSON.parse(localStorage.getItem("playersShifumi") || "[]");
}
LoadplayersShifumiRanking();

function CISEAUX() {
    document.getElementById("ordinateur").classList.remove("result");
    document.getElementById("resultat").classList.remove("result");
    userChoice = 0;
    console.log("Vous choisissez Ciseaux");
    document.getElementById("Joueur").innerText = "Ciseaux";
    document.getElementById("ordinateur").innerText = "";
    document.getElementById("resultat").innerText = "";
}

function FEUILLE() {
    document.getElementById("ordinateur").classList.remove("result");
    document.getElementById("resultat").classList.remove("result");
    userChoice = 1;
    console.log("Vous choisissez Feuille");
    document.getElementById("Joueur").innerText = "Feuille";
    document.getElementById("ordinateur").innerText = "";
    document.getElementById("resultat").innerText = "";
}

function PIERRE() {
    document.getElementById("ordinateur").classList.remove("result");
    document.getElementById("resultat").classList.remove("result");
    userChoice = 2;
    console.log("Vous choisissez Pierre");
    document.getElementById("Joueur").innerText = "Pierre";
    document.getElementById("ordinateur").innerText = "";
    document.getElementById("resultat").innerText = "";
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function JOUER() {
    if (document.getElementById("PlayerName").value == "") {
        alert("Veuillez indiquer votre pseudo ;-)");
    } else if (!(userChoice==0 || userChoice==1 || userChoice==2)) {
        alert("Veuillez choir ce que vous jouez ;-)");
    } else {
        let pseudo = document.getElementById("PlayerName").value;
        joueur = new Player(document.getElementById("PlayerName").value, 0, 0);
        if (!(playersShifumi.find(player => player.Pseudo == joueur.Pseudo))) {
            playersShifumi.push(joueur);
        }
        final = 0;
        IA = getRandomInt(3);

        if (userChoice == 0) {
            //Si l'utilisateur joue CISEAUX
            if (IA == 0) {
                document.getElementById("resultat").innerText = "Match Nul"
                final = 0; //Match nul
            }
            else if (IA == 1) {
                final = 1; //Victoire
            }
            else if (IA == 2) {
                final = 2; //D??faite
            }
        } else if (userChoice == 1) {
            //Si l'utilisateur joue FEUILLE
            if (IA == 0) {
                final = 2; //D??faite
            }
            else if (IA == 1) {
                final = 0; //Match Nul
            }
            else if (IA == 2) {
                final = 1; //Victoire
            }
        } else if (userChoice == 2) {
            //Si l'utilisateur joue PIERRE
            if (IA == 0) {
                final = 1; //Victoire
            }
            else if (IA == 1) {
                final = 2; //D??faite
            }
            else if (IA == 2) {
                final == 0; //Match Nul
            }
        }

        if (IA == 0) {
            document.getElementById("ordinateur").classList.add("result");
            document.getElementById("ordinateur").innerText = "Ciseaux";
            console.log("L'ordinateur a jou?? Ciseaux");
        }
        else if (IA == 1) {
            document.getElementById("ordinateur").classList.add("result");
            document.getElementById("ordinateur").innerText = "Feuille";
            console.log("L'ordinateur a jou?? Feuille");
        }
        else if (IA == 2) {
            document.getElementById("ordinateur").classList.add("result");
            document.getElementById("ordinateur").innerText = "Pierre";
            console.log("L'ordinateur a jou?? Pierre");
        }

        if (final == 0) {
            document.getElementById("resultat").classList.add("result");
            document.getElementById("resultat").innerText = "Match Nul";
            console.log("Match Nul");
        }
        else if (final == 1) {
            document.getElementById("resultat").classList.add("result");
            document.getElementById("resultat").innerText = "Vous avez gagn??";
            console.log("Gagn??");
        }
        else if (final == 2) {
            document.getElementById("resultat").classList.remove("result");
            document.getElementById("resultat").classList.add("result");
            document.getElementById("resultat").innerText = "Vous avez perdu";
            console.log("Perdu");
        }
        
        ActuTabScore(final);
        
        let choixjoueur = document.getElementById("Joueur").textContent;
        let choixordi = document.getElementById("ordinateur").textContent;
        partie = new Game(pseudo, choixjoueur, choixordi, final);
        Jeux.push(partie);
        if (Jeux.length>10) {
            Jeux.shift();
        }
        document.getElementById("HistoriqueSelec").innerHTML="";
        for (let i = 0; i <= Jeux.length; i++) {
            AffGame(Jeux[i]);
        }
    }
}
