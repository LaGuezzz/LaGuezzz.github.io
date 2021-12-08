let objectarray=new Array();
let currentobject;
let count=0;
let players = new Array();
let gameinprogress=false;

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

addtoarray("Lamborghini",160000,"Objects/Lamborghini.jpg",objectarray);
addtoarray("Dragon Blanc Aux Yeux Bleus",25,"Objects/DragonBlanc.png",objectarray);
addtoarray("Sèche-linge",499,"Objects/seche-linge.png",objectarray);
addtoarray("Volant-Léopard",15,"Objects/volant-leopard.jpg",objectarray);

function InputImage()
{
    console.log(document.getElementById("PseudoInput").value);
    if (document.getElementById("PseudoInput").value=="")
    {
        alert("Veuillez indiquer votre pseudo ;-)");
    }
    else
    {
        document.getElementById('Result').innerText="";
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
    AverageStrokesCell.innerText = Player.AverageStrokes;
    PlayerRow.appendChild(PseudoCell);
    PlayerRow.appendChild(PlayedCell);
    PlayerRow.appendChild(AverageStrokesCell);
    tablePlayers.appendChild(PlayerRow);
}


function DisplayTable()
{
    players.sort((Player1,Player2)=>Player1.AverageStrokes-Player2.AverageStrokes);
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
function LoadPlayersRanking()
{
    let players=JSON.parse(localStorage.getItem("players")||"[]");
    DisplayTable();
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
            document.getElementById("tblPlayers").innerHTML="<thead><tr><th colspan='3'>TOP10</th></tr><th>Pseudo</th><th>Parties jouées</th><th>Nombre de coups moyens</th></thead><tbody></tbody>";
            DisplayTable();
        }
        else
        {
            let Player=new AddPlayer(document.getElementById("PseudoInput").value,1,count);
            players.push(Player);
            document.getElementById("tblPlayers").innerHTML="<thead><tr><th colspan='3'>TOP10</th></tr><th>Pseudo</th><th>Parties jouées</th><th>Nombre de coups moyens</th></thead><tbody></tbody>";
            DisplayTable();
        }
    document.getElementById('ObjectImage').innerHTML="";
    count=0;
    gameinprogress=false;
    localStorage.setItem("players", JSON.stringify(players));
}


function compareprice()
{
        let div=document.getElementById('Result');

        if (currentobject.price==document.getElementById("PriceInput").value)
        {
            count++;
            div.innerText= "YOU WIN! en "+count+" coups";
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
    players=JSON.parse(localStorage.getItem("players")||"[]");
    DisplayTable(players);
}



LoadPlayersRanking();

