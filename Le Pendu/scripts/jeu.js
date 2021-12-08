let game1;
let motDIV = document.querySelector('#mot');
let restantDIV = document.querySelector('#tentatives');

function motAleatoire(){

    let random = Math.floor(Math.random()*9);

    let dictionnaire = ['lapin','poulet','marmotte','chamois','rat','chat','faucon','cheval','salamandre'];
    return(dictionnaire[random]);
}

function recolor(){
    let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    alphabet.forEach(lettre => {
        document.getElementById(lettre).style.backgroundColor="#EDEEEE";
    } )
    
}


window.addEventListener('keypress', (e) => {

    let guess = String.fromCharCode(e.charCode);
    game1.makeGuess(guess);
    document.getElementById(guess).style.backgroundColor="#666666";
    render();
})

let render = () => {
    motDIV.innerHTML = '';
    restantDIV.textContent = game1.statusMessage;

    game1.MOT.split('').forEach((letter) => {
        let letterEl = document.createElement('span');
        letterEl.textContent = letter;
        motDIV.appendChild(letterEl);
    })
    
}

let startGame = () => {   
    let newMot =  motAleatoire();
    game1 = new Pendu(newMot, 5);
    render();
}

document.querySelector('#reset').addEventListener('click',startGame,recolor);

startGame();
