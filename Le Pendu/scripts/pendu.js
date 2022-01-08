class Pendu {
    constructor(mot, tentativesRestantes){
        this.mot = mot.toLowerCase().split('');
        this.tentativesRestantes = tentativesRestantes;
        this.guessedLetters = [];
        this.status = 'playing';
    }
    

    get MOT() {
        let MOT = '';
        this.mot.forEach((letter) => {
        if (this.guessedLetters.includes(letter) || letter === ' '){
            MOT += letter;
        } else {
            MOT += '_ '
        }
        })
        return MOT;
    }

    makeGuess (guess){
        guess = guess.toLowerCase();
        let isUnique = !this.guessedLetters.includes(guess);
        let isBadGuess = !this.mot.includes(guess);
        let nbErreurs = 0;
        
        if (this.status !== 'playing'){
            return
        }
    
        if (isUnique){
            this.guessedLetters.push(guess)
        }
            
        if (isUnique && isBadGuess){
            this.tentativesRestantes--;
            nbErreurs++;
            image(5-this.tentativesRestantes);
        }
        this.etat();
    }

    get statusMessage(){
        
        if (this.status === 'playing'){
            return `Tentatives restantes: ${this.tentativesRestantes}`
        } else if (this.status === 'failed') {
            if(!alerted)
            {
                alerted=1
                setTimeout(() => { alert(`Dommage! le mot était "${this.mot.join('')}" `) }, 10)

            }
            
        } else {
            if(!alerted)
            {
                alerted=1
                alert("Bien joué! vous avez trouvé le mot!")
            }
        }
    }

    etat(){
        let win;
        let finished = this.mot.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')
        
        if (this.tentativesRestantes === 0){
            this.status = 'failed'
            win = 0;
            EndGame(win);
        } else if (finished){
            win = 1;
            EndGame(win);
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }

}

