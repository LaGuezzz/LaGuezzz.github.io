let objectarray=new Array();
let currentobject;
let count=0;
let gameinprogress=false;
let periode=0;

function addobject(name, price, source) {
    this.name = name;
    this.price = price;
    this.img=document.createElement("img");
    this.img.src=source;
}

function addtoarray(name,price,source,array){
    let object=new addobject(name,price,source);
    array.push(object);

}

addtoarray("Lamborghini",337865,"Objects/Lamborghini.jpg",objectarray);
addtoarray("Dragon Blanc Aux Yeux Bleus",25,"Objects/DragonBlanc.png",objectarray);
addtoarray("Sèche-linge",499,"Objects/seche-linge.png",objectarray);
addtoarray("Volant-Léopard",15,"Objects/volant-leopard.jpg",objectarray);
addtoarray("Babouche-Aladin",139,"Objects/babouche-aladin.jpg",objectarray);
addtoarray("Collection Intégrale Dora l'Exploratrice",95,"Objects/integral-dora.jpg",objectarray);
addtoarray("Rat de compagnie",17,"Objects/rat-domestique.jpg",objectarray);
addtoarray("Vinyle Aya Nakamura",16,"Objects/vinyle-nakamura.jpg",objectarray);
addtoarray("Statue Gorille et Bébé noire",1299,"Objects/statue-gorille.png",objectarray);
addtoarray("Vase en Ouraline",117,"Objects/vase-ouraline.jpg",objectarray);

function InputImage()
{
    console.log(document.getElementById("PseudoInput").value);
    clearInterval(periode);
    if (document.getElementById("PseudoInput").value=="")
    {
        alert("Veuillez indiquer votre pseudo ;-)");
    }
    else
    {
        document.getElementById("beginning").style.display = "none";
        document.getElementById("price").style.display = "block";
        document.getElementById('Result').innerHTML="";
        if (!gameinprogress)
        {
            let div=document.getElementById('ObjectImage');
            let random=Math.floor(Math.random()*objectarray.length);
            let img=new Image();
            img.onload=function()
            {
                div.innerHTML += '<img src="'+img.src+'"style="width:35%;" />';  
       
            };
            div.innerText += objectarray[random].name;
            img.src=objectarray[random].img.src;
            currentobject=objectarray[random];
            gameinprogress=true;
        }
    }
}

class AddPlayer {
    constructor(pseudo, played, count) {
        this.Pseudo = pseudo;
        this.Played = played;
        this.Strokes = count;
        this.AverageStrokes = this.Strokes / this.Played;
    }
}

function AddPlayerRow(Player)
{
    const tablePlayers = document.getElementById("tblPlayers");
    const PlayerRow = document.createElement("TR");
    const PseudoCell = document.createElement("TD");
    PseudoCell.innerText = Player.Pseudo;
    const PlayedCell = document.createElement("TD");
    PlayedCell.innerText = Player.Played;
    const AverageStrokesCell = document.createElement("TD");
    AverageStrokesCell.innerText = (Player.AverageStrokes).toPrecision(3);
    PlayerRow.appendChild(PseudoCell);
    PlayerRow.appendChild(PlayedCell);
    PlayerRow.appendChild(AverageStrokesCell);
    tablePlayers.appendChild(PlayerRow);
}


function DisplayTable()
{
    players.sort(function(a,b){
        if (b.AverageStrokes!=a.AverageStrokes){
           return a.AverageStrokes-b.AverageStrokes;
        }else{
           return b.Played-a.Played;
        }});
    if (players.length>10)
    {
        for(let i=0;i<10;i++)
        {
            AddPlayerRow(players[i]);
        }
    }
    else
    {
        for(let i=0;i<players.length;i++)
        {
            AddPlayerRow(players[i]);
        }

    }
}


function ModifyPlayersRanking()
{
    if (players.find((Player) =>Player.Pseudo===document.getElementById("PseudoInput").value))
         {
            Player=players.findIndex((Player)=>Player.Pseudo===document.getElementById("PseudoInput").value);
            console.log(Player);
            players[Player].Strokes+=count;
            players[Player].Played+=1
            players[Player].AverageStrokes=players[Player].Strokes/players[Player].Played
            document.getElementById("tblPlayers").innerHTML="<thead><tr><th colspan='3'><span id='top'>TOP10</span></th></tr><th>Pseudo</th><th>Parties jouées</th><th>Nombre de coups moyens</th></thead><tbody></tbody>";
            DisplayTable();
        }
        else
        {
            let Player=new AddPlayer(document.getElementById("PseudoInput").value,1,count);
            players.push(Player);
            document.getElementById("tblPlayers").innerHTML="<thead><tr><th colspan='3'><span id='top'>TOP10</span></th></tr><th>Pseudo</th><th>Parties jouées</th><th>Nombre de coups moyens</th></thead><tbody></tbody>";
            DisplayTable();
        }
    document.getElementById('ObjectImage').innerHTML="";
    count=0;
    gameinprogress=false;
    localStorage.setItem("playersPlusOuMoins", JSON.stringify(players));
}

function loadConfetti()
{
    const start = () => {
        setTimeout(function() {
            confetti.start()
        }, 300); // value in ms => ( 1000 = 1 sec) the time before confetti start falling
    };
    
    //  for stopping the confetti 
    
    const stop = () => {
        setTimeout(function() {
            confetti.stop()
        }, 7000); // value in ms =>( 5000 = 5 sec) confetti fall during this amount of time 
    };
    start();
    stop();

}


function compareprice()
{
        let div=document.getElementById('Result');

        if (currentobject.price==document.getElementById("PriceInput").value)
        {
            count++;
            div.innerHTML= "<span style='color: red; font-size:300%; font-weight:bold;'>YOU WIN!</span>";
            document.getElementById("price").style.display = "none";
            document.getElementById("beginning").style.display = "block";
            let clignotement = function(){ 
                if (div.style.visibility=='visible'){ 
                   div.style.visibility='hidden'; 
                } 
                else{ 
                div.style.visibility='visible'; 
                } 
            };
            let vitesse=600;
            document.getElementById('Result').onload=loadConfetti();
            periode = setInterval(clignotement, vitesse); 
            ModifyPlayersRanking();

        }

        else if(currentobject.price<document.getElementById("PriceInput").value)
        {
            count++;
            div.innerText= "C'est moins! "+count+" coups";
        }
        else if(currentobject.price>document.getElementById("PriceInput").value)
        {
            count++;
            div.innerText= "C'est plus! "+count+" coups";
        

        }
        else
        {
            div.innerText= "Entrez une valeure correcte SVP!";

        }
}

function LoadPlayersRanking()
{
    players=JSON.parse(localStorage.getItem("playersPlusOuMoins")||"[]");
    DisplayTable(players);
}

LoadPlayersRanking();
