let game = {

    lockMode : false,
    firstCard : null,
    secundCard : null,
    
    techs : ["bootstrap",
    "css",
    "electron",
    "firebase",
    "html",
    "javascript",
    "jquery",
    "mongo",
    "node",
    "react"],

    setCard: function(id){

        let card = this.cards.filter(card=>card.id===id)[0];
        console.log(card)

        if(card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secundCard = card;
            this.lockMode = true;
            this.secundCard.flipped = true;
            return true;
        }



    },
    checkMath: function(){
        if(!this.firstCard ||!this.secundCard){
            return false;
        }
        return(this.firstCard.icon === this.secundCard.icon);

    },

    clearCards: function(){
        this.firstCard = null;
        this.secundCard = null;
        this.lockMode = false;
    },
    unflipCards(){
        this.firstCard.flipped = false;
        this.secundCard.flipped = false;
        this.clearCards();

    },

    checkGameOver(){
        return this.cards.filter(card=>!card.flipped).length == 0;
    },
    cards : null,
    createCardsFromTechs: function() {
        this.cards = [];

        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech))
        })

        this.cards = (this.cards.flatMap(pair => pair));
        this.shuffleCards();
        return this.cards;
    },

    createPairFromTech: function(tech){
        return [{
            id: this.createIdFromTech(tech),
            icon: tech,
            flipped: false,


        }, {
            id: this.createIdFromTech(tech),
            icon: tech,
            flipped: false,
        }]
    },

    createIdFromTech: function(tech){
        return tech + parseInt(Math.random() * 1000);
    },
    shuffleCards: function(cards){
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while(currentIndex !== 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]

        }

    }


}