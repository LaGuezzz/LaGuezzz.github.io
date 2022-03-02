let game1;
let mot = document.querySelector('#mot');
let tentatives = document.querySelector('#tentatives');
let butt=document.querySelector('#start');
let win;
let alerted = 0;

function motAleatoire(){

    let dictionnaire = ['lapin','poulet','marmotte','chamois','rat','chat','faucon','cheval','salamandre','chien','coq','abeille','baleine','bison','canard','carpe','cochon','crapaud','dinde','faisan','girafe','gorille','lion','loup','ours','renard','sanglier','serpent','singe','souris','tigre','vache'];
    let random = Math.floor(Math.random()*(dictionnaire.length-1));

    return(dictionnaire[random]);
}

function recolor(){
    let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    alphabet.forEach(lettre => {
        document.getElementById(lettre).style.backgroundColor="";
    } )
    
}


window.addEventListener('keypress', (lettre) => {

    let guess = String.fromCharCode(lettre.charCode);
    game1.makeGuess(guess);
    document.getElementById(guess).style.backgroundColor="#666666";
    render();
})

let render = () => {
    mot.innerHTML = '';
    tentatives.textContent = game1.statusMessage;

    game1.MOT.split('').forEach((letter) => {
        let letterEl = document.createElement('span');
        letterEl.textContent = letter;
        mot.appendChild(letterEl);
    })
    
}

function image(indice){
    let img = document.createElement("img");
    img.src = "./images/Pendu_"+indice+".png";
    document.getElementById('image').replaceChildren(img);
}



let startGame = () => {  
    if (document.getElementById("pseudo").value == "") {
        alert("Veuillez indiquer votre pseudo ;-)");
    } else {
        document.getElementById("info").style.display = "none";
        document.getElementById("consigne").style.display = "block";
        document.getElementById("conteneur").style.display = "block";
        joueur = new Player(document.getElementById("pseudo").value, 0, 0);
        if (!(players.find(player => player.Pseudo==joueur.Pseudo))) {
            players.push(joueur);
            localStorage.setItem("playersPendu",JSON.stringify(players));
        }
        butt.disabled = true;
        let img = document.createElement("img");
        img.src = "./images/attente.png";
        document.getElementById('image').replaceChildren(img) 
        let newMot =  motAleatoire();
        game1 = new Pendu(newMot, 5);
        alerted=0;
        recolor();
        render();
        
    }
}

function EndGame(win) {
    ActuTabScore(win);
    document.getElementById("tblPlayers").innerHTML = "";
    ActuAffScore();
    butt.disabled = false;
    document.getElementById("info").style.display = "block";
    document.getElementById("consigne").style.display = "none";
    document.getElementById("conteneur").style.display = "none";

}

