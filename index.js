playersNim=JSON.parse(localStorage.getItem("playersNim")||"[]");
playersPlusOuMoins=JSON.parse(localStorage.getItem("playersPlusOuMoins")||"[]");
playersPendu=JSON.parse(localStorage.getItem("playersPendu")||"[]");
playersTotal=JSON.parse(localStorage.getItem("playersTotal")||"[]");

console.log(playersTotal);

class AddPlayer {
    constructor(Pseudo,WinPendu,PlayedPendu,PercentagePendu,PlayedPlusOuMoins,ScorePlusOuMoins,PlayedNim,WinNim,PercentageNim) {
        this.Pseudo=Pseudo;
        this.ScoreShifumi=0;
        this.WinPendu=WinPendu;
        this.PlayedPendu=PlayedPendu;
        this.PercentagePendu=PercentagePendu; 
        this.PlayedPlusOuMoins=PlayedPlusOuMoins;
        this.ScorePlusOuMoins=ScorePlusOuMoins;
        this.PlayedNim=PlayedNim;
        this.WinNim=WinNim;
        this.PercentageNim=PercentageNim;
        this.Total;
    }
}

function CalcTotal(Shifumi,Pendu,PlusOuMoins,Nim)
{
    score=(0.25*Shifumi) + (0.25*Pendu) + (0.25*(100-PlusOuMoins)) + (0.25*Nim);
    return score;
}


function AddPlusOuMoins()
{
    for (i=0;i<playersPlusOuMoins.length;i++)
    {
        if (playersTotal.find((Player) =>Player.Pseudo==playersPlusOuMoins[i].Pseudo))
        {
            Player=playersTotal.findIndex((Player)=>Player.Pseudo==playersPlusOuMoins[i].Pseudo);
            playersTotal[Player].PlayedPlusOuMoins=playersPlusOuMoins[i].Played;
            playersTotal[Player].ScorePlusOuMoins=playersPlusOuMoins[i].AverageStrokes;
            playersTotal[Player].Total=CalcTotal(playersTotal[Player].ScoreShifumi,playersTotal[Player].PercentagePendu,playersTotal[Player].ScorePlusOuMoins,playersTotal[Player].PercentageNim);
        }
        else
        {
            let p=new AddPlayer(playersPlusOuMoins[i].Pseudo,0,0,0,0,playersPlusOuMoins[i].Played,playersPlusOuMoins[i].AverageStrokes,0,0,0);
            p.Total=CalcTotal(p.ScoreShifumi,p.PercentagePendu,p.ScorePlusOuMoins,p.PercentageNim);
            playersTotal.push(p);
        }    
    }
}

function AddNim()
{
    for (i=0;i<playersNim.length;i++)
    {
        if (playersTotal.find((Player) =>Player.Pseudo==playersNim[i].Pseudo))
        {
            Player=playersTotal.findIndex((Player)=>Player.Pseudo==playersNim[i].Pseudo);
            playersTotal[Player].PlayedNim=playersNim[i].Played;
            playersTotal[Player].PercentageNim=playersNim[i].Percentage;
            playersTotal[Player].WinNim=playersNim[i].Win;
            playersTotal[Player].Total=CalcTotal(playersTotal[Player].ScoreShifumi,playersTotal[Player].PercentagePendu,playersTotal[Player].ScorePlusOuMoins,playersTotal[Player].PercentageNim);

        }
        else
        {
            let p=new AddPlayer(playersNim[i].Pseudo,0,0,0,0,0,0,playersNim[i].Played,playersNim[i].Win,playersNim[i].Percentage);
            p.Total=CalcTotal(p.ScoreShifumi,p.PercentagePendu,p.ScorePlusOuMoins,p.PercentageNim);
            playersTotal.push(p);
        }
    }
}

function AddPendu()
{
    for (i=0;i<playersPendu.length;i++)
    {
        if (playersTotal.find((Player) =>Player.Pseudo==playersPendu[i].Pseudo))
        {
            Player=playersTotal.findIndex((Player)=>Player.Pseudo==playersPendu[i].Pseudo);
            playersTotal[Player].WinPendu=playersPendu[i].Win;
            playersTotal[Player].PercentagePendu=playersPendu[i].Percentage;
            playersTotal[Player].PlayedPendu=playersPendu[i].Played;
            playersTotal[Player].Total=CalcTotal(playersTotal[Player].ScoreShifumi,playersTotal[Player].PercentagePendu,playersTotal[Player].ScorePlusOuMoins,playersTotal[Player].PercentageNim);

        }
        else
        {
            let p =new AddPlayer(playersPendu[i].Pseudo,0,playersPendu[i].Win,playersPendu[i].Played,playersPendu[i].Percentage,0,0,0,0,0);
            p.Total=CalcTotal(p.ScoreShifumi,p.PercentagePendu,p.ScorePlusOuMoins,p.PercentageNim);
            playersTotal.push(p);
        }
    }
}

function ModifyPlayersTotal()
{
    AddPlusOuMoins();
    AddNim();
    AddPendu();
    localStorage.setItem("playersTotal", JSON.stringify(playersTotal));

}

function AddPlayerRow(Player)
{
    const tablePlayers = document.getElementById("tblPlayers");
    const PlayerRow = document.createElement("TR");
    const PseudoCell = document.createElement("TD");
    PseudoCell.innerText = Player.Pseudo;
    const ShifumiCell=document.createElement("TD");
    ShifumiCell.innerText=(Player.ScoreShifumi).toPrecision(3)+"%";
    const WinPendu = document.createElement("TD");
    WinPendu.innerText = Player.WinPendu;
    const PlayedPendu = document.createElement("TD");
    PlayedPendu.innerText = Player.PlayedPendu;
    const PercentagePendu = document.createElement("TD");
    PercentagePendu.innerText = (Player.PercentagePendu).toPrecision(3)+"%";
    const PlayedPlusOuMoinsCell = document.createElement("TD");
    PlayedPlusOuMoinsCell.innerText = Player.PlayedPlusOuMoins;
    const ScorePlusOuMoins = document.createElement("TD");
    ScorePlusOuMoins.innerText = Player.ScorePlusOuMoins;
    const NimWin = document.createElement("TD");
    NimWin.innerText = Player.WinNim;
    const NimPlayed = document.createElement("TD");
    NimPlayed.innerText = Player.PlayedNim
    const NimPercentage = document.createElement("TD");
    NimPercentage.innerText = (Player.PercentageNim).toPrecision(3)+"%";
    const Total = document.createElement ("TD");
    Total.innerText = (Player.Total).toPrecision(3);
    PlayerRow.appendChild(PseudoCell);
    PlayerRow.appendChild(ShifumiCell);
    PlayerRow.appendChild(WinPendu);
    PlayerRow.appendChild(PlayedPendu);
    PlayerRow.appendChild(PercentagePendu);
    PlayerRow.appendChild(PlayedPlusOuMoinsCell);
    PlayerRow.appendChild(ScorePlusOuMoins);
    PlayerRow.appendChild(NimWin);
    PlayerRow.appendChild(NimPlayed);
    PlayerRow.appendChild(NimPercentage);
    PlayerRow.appendChild(Total);
    tablePlayers.appendChild(PlayerRow);
}

function DisplayTable()
{
    document.getElementById("tblPlayers").innerHTML="<thead><tr><th colspan='10'><span id='top'> TOP 10 </span></th></tr><tr><th rowspan='2'> Pseudo </th><th> Score <span id='shifumi'> Shifumi</span> </th><th colspan='3'> Score <span id='pendu'> Pendu </span> </th><th colspan='2'> Score <span id='juste_prix'> Juste Prix </span> </th><th colspan='3'> Score <span id='nim'> Jeu de Nim </span></th><th rowspan='2'> SCORE TOTAL </th></tr><tr><th></th><th> Parties gagnées </th><th> Parties jouées </th><th> Pourcentage de victoire </th><th>Parties jouées</th><th>Nombre de coups moyens</th><th> Parties gagnées </th><th> Parties jouées </th><th> Pourcentage de victoire </th></tr></thead><tbody></tbody>";
    console.log(playersTotal);
    playersTotal.sort((Player1,Player2)=>Player2.Total-Player1.Total);
    if (playersTotal.length>10)
    {
        for(let i=0;i<10;i++)
        {
            AddPlayerRow(playersTotal[i]);
        }
    }
    else
    {
        for(let i=0;i<playersTotal.length;i++)
        {
            AddPlayerRow(playersTotal[i]);
        }

    }
}


ModifyPlayersTotal();
DisplayTable();
