let userChoice;
let final;

function CISEAUX()
{
    document.getElementById("ordinateur").classList.remove("result")
    document.getElementById("resultat").classList.remove("result")
    userChoice = 0;
    console.log("Vous choisissez Ciseaux");
    document.getElementById("Joueur").innerText="Ciseaux"
    document.getElementById("ordinateur").innerText=""
    document.getElementById("resultat").innerText=""
}

function FEUILLE()
{
    document.getElementById("ordinateur").classList.remove("result")
    document.getElementById("resultat").classList.remove("result")
    userChoice = 1;
    console.log("Vous choisissez Feuille");
    document.getElementById("Joueur").innerText="Feuille"
    document.getElementById("ordinateur").innerText=""
    document.getElementById("resultat").innerText=""

}

function PIERRE()
{
    document.getElementById("ordinateur").classList.remove("result")
    document.getElementById("resultat").classList.remove("result")
    userChoice = 2;
    console.log("Vous choisissez Pierre");
    document.getElementById("Joueur").innerText="Pierre"
    document.getElementById("ordinateur").innerText=""
    document.getElementById("resultat").innerText=""

}



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function JOUER()
{
    final = 0;
    IA = getRandomInt(3);

    //Si l'utilisateur joue CISEAUX
    if (userChoice == 0)
    {
       if (IA == 0)
        {
            document.getElementById("resultat").innerText="Match Nul"
            final = 0; //Match nul
        }
        else if (IA == 1)
        {
            final = 1; //Victoire
        }
        else if (IA == 2)
        {
            final = 2; //Défaite
        }
    }


    //Si l'utilisateur joue FEUILLE
    if (userChoice == 1)
    {
        if (IA == 0)
        {
            final = 2; //Défaite
        }
        else if (IA == 1)
        {
            final = 0; //Match Nul
        }
        else if (IA == 2)
        {
            final = 1; //Victoire
        }
    }

    //Si l'utilisateur joue PIERRE
    if (userChoice == 2)
    {
        if (IA == 0)
        {
            final = 1; //Victoire
        }
        else if (IA == 1)
        {
            final = 2; //Défaite
        }
        else if (IA == 2)
        {
            final == 0; //Match Nul
        }
    }

    if (IA == 0)
    {
        document.getElementById("ordinateur").classList.add("result")
        document.getElementById("ordinateur").innerText="Ciseaux"
        console.log("L'ordinateur a joué Ciseaux");
    }
    else if (IA == 1)
    {
        document.getElementById("ordinateur").classList.add("result")
        document.getElementById("ordinateur").innerText="Feuille"
        console.log("L'ordinateur a joué Feuille");
    }
    else if (IA == 2)
    {
        document.getElementById("ordinateur").classList.add("result")
        document.getElementById("ordinateur").innerText="Pierre"
        console.log("L'ordinateur a joué Pierre");
    }


    if (final == 0)
    {
        document.getElementById("resultat").classList.add("result")
        document.getElementById("resultat").innerText="Match Nul"
        console.log("Match Nul");
    }
    else if (final == 1)
    {
        document.getElementById("resultat").classList.add("result")
        document.getElementById("resultat").innerText="Vous avez gagné"
        console.log("Gagné");
    }
    else if (final == 2)
    {
        document.getElementById("resultat").classList.remove("result")
        document.getElementById("resultat").classList.add("result")
        document.getElementById("resultat").innerText="Vous avez perdu"
        console.log("Perdu");
    }

    const NomJoueur = document.getElementById("PlayerName").value
    const TableHist = document.getElementById("HistoriqueSelec");
    const ligne = document.createElement("tr");
    const choix = document.getElementById("Joueur").textContent;
    const fin = document.getElementById("ordinateur").textContent;

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
    if (final == 0)
    {
        celluleres.style.backgroundColor="yellow";
    }
    else if (final == 1)
    {
        celluleres.style.backgroundColor="green";
    }
    else if (final == 2)
    {
        celluleres.style.backgroundColor="red";
    }
    ligne.appendChild(celluleres);

    
    TableHist.appendChild(ligne);

}