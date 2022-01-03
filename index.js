playersNim=JSON.parse(localStorage.getItem("playersNim")||"[]");
playersPlusOuMoins=JSON.parse(localStorage.getItem("playersPlusOuMoins")||"[]");
playersPendu=JSON.parse(localStorage.getItem("playersPendu")||"[]");
playersTotal=JSON.parse(localStorage.getItem("playersTotal")||"[]");

console.log(playersTotal);

class AddPlayer {
    constructor(Pseudo,WinShifumi,PlayedShifumi,PercentageShifumi,WinPendu,PlayedPendu,PercentagePendu,PlayedPlusOuMoins,ScorePlusOuMoins,PlayedNim,WinNim,PercentageNim) {
        this.Pseudo=Pseudo;
        this.WinShifumi=WinShifumi;
        this.PlayedShifumi=PlayedShifumi;
        this.PercentageShifumi=PercentageShifumi;
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
    if (PlusOuMoins==0) {
        score=(0.25*Shifumi) + (0.25*Pendu) + (0.25*Nim);
    } else {
        score=(0.25*Shifumi) + (0.25*Pendu) + (0.25*(101-PlusOuMoins)) + (0.25*Nim);
    }
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
            playersTotal[Player].Total=CalcTotal(playersTotal[Player].PercentageShifumi,playersTotal[Player].PercentagePendu,playersTotal[Player].ScorePlusOuMoins,playersTotal[Player].PercentageNim);
        }
        else
        {
            let p=new AddPlayer(playersPlusOuMoins[i].Pseudo,0,0,0,0,0,0,playersPlusOuMoins[i].Played,playersPlusOuMoins[i].AverageStrokes,0,0,0);
            p.Total=CalcTotal(p.PercentageShifumi,p.PercentagePendu,p.ScorePlusOuMoins,p.PercentageNim);
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
            playersTotal[Player].WinNim=playersNim[i].Win;
            playersTotal[Player].PercentageNim=playersNim[i].Percentage;
            playersTotal[Player].Total=CalcTotal(playersTotal[Player].PercentageShifumi,playersTotal[Player].PercentagePendu,playersTotal[Player].ScorePlusOuMoins,playersTotal[Player].PercentageNim);

        }
        else
        {
            let p=new AddPlayer(playersNim[i].Pseudo,0,0,0,0,0,0,0,0,playersNim[i].Played,playersNim[i].Win,playersNim[i].Percentage);
            p.Total=CalcTotal(p.PercentageShifumi,p.PercentagePendu,p.ScorePlusOuMoins,p.PercentageNim);
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
            playersTotal[Player].PlayedPendu=playersPendu[i].Played;
            playersTotal[Player].PercentagePendu=playersPendu[i].Percentage;
            playersTotal[Player].Total=CalcTotal(playersTotal[Player].PercentageShifumi,playersTotal[Player].PercentagePendu,playersTotal[Player].ScorePlusOuMoins,playersTotal[Player].PercentageNim);

        }
        else
        {
            let p =new AddPlayer(playersPendu[i].Pseudo,0,0,0,playersPendu[i].Win,playersPendu[i].Played,playersPendu[i].Percentage,0,0,0,0,0);
            p.Total=CalcTotal(p.PercentageShifumi,p.PercentagePendu,p.ScorePlusOuMoins,p.PercentageNim);
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
    const WinShifumiCell = document.createElement("TD");
    WinShifumiCell.innerText = Player.WinShifumi;
    const PlayedShifumiCell = document.createElement("TD");
    PlayedShifumiCell.innerText = Player.PlayedShifumi;
    const PercentageShifumiCell=document.createElement("TD");
    PercentageShifumiCell.innerText=(Player.PercentageShifumi).toPrecision(4)+"%";
    const WinPenduCell = document.createElement("TD");
    WinPenduCell.innerText = Player.WinPendu;
    const PlayedPenduCell = document.createElement("TD");
    PlayedPenduCell.innerText = Player.PlayedPendu;
    const PercentagePenduCell = document.createElement("TD");
    PercentagePenduCell.innerText = (Player.PercentagePendu).toPrecision(4)+"%";
    const PlayedPlusOuMoinsCell = document.createElement("TD");
    PlayedPlusOuMoinsCell.innerText = Player.PlayedPlusOuMoins;
    const ScorePlusOuMoinsCell = document.createElement("TD");
    ScorePlusOuMoinsCell.innerText = (Player.ScorePlusOuMoins).toPrecision(4);
    const NimWinCell = document.createElement("TD");
    NimWinCell.innerText = Player.WinNim;
    const NimPlayedCell = document.createElement("TD");
    NimPlayedCell.innerText = Player.PlayedNim
    const NimPercentageCell = document.createElement("TD");
    NimPercentageCell.innerText = (Player.PercentageNim).toPrecision(4)+"%";
    const TotalCell = document.createElement ("TD");
    TotalCell.innerText = (Player.Total).toPrecision(4);
    PlayerRow.appendChild(PseudoCell);
    PlayerRow.appendChild(WinShifumiCell);
    PlayerRow.appendChild(PlayedShifumiCell);
    PlayerRow.appendChild(PercentageShifumiCell);
    PlayerRow.appendChild(WinPenduCell);
    PlayerRow.appendChild(PlayedPenduCell);
    PlayerRow.appendChild(PercentagePenduCell);
    PlayerRow.appendChild(PlayedPlusOuMoinsCell);
    PlayerRow.appendChild(ScorePlusOuMoinsCell);
    PlayerRow.appendChild(NimWinCell);
    PlayerRow.appendChild(NimPlayedCell);
    PlayerRow.appendChild(NimPercentageCell);
    PlayerRow.appendChild(TotalCell);
    tablePlayers.appendChild(PlayerRow);
}

function DisplayTable()
{
    document.getElementById("tblPlayers").innerHTML="<thead><tr><th colspan='13'><span id='top'> TOP 10 </span></th></tr>"+
        "<tr><th rowspan='3'> Pseudo </th><th colspan='3'> Score <span id='shifumi'> Shifumi</span> </th>"+
        "<th colspan='3'> Score <span id='pendu'> Pendu </span> </th><th colspan='2'> Score <span id='juste_prix'> Juste Prix </span> </th>"+
        "<th colspan='3'> Score <span id='nim'> Jeu de Nim </span></th><th rowspan='3'> SCORE TOTAL </th></tr>"+
        "<tr><th colspan='2'> Parties </th><th rowspan='2'> Pourcentage de victoire </th><th colspan='2'> Parties </th>"+
        "<th rowspan='2'> Pourcentage de victoire </th><th rowspan='2'> Parties jouées </th><th rowspan='2'> Nombre de coups moyen </th>"+
        "<th colspan='2'> Parties </th><th rowspan='2'> Pourcentage de victoire </th></tr>"+
        "<tr><th> Jouées </th><th> Gagnées </th><th> Jouées </th><th> Gagnées </th><th> Jouées </th> <th> Gagnées </th> </tr>"+
        "</thead><tbody> </tbody>";
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
