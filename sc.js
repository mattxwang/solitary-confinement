
class SolitaryConfinement {
    constructor(){
        this.stage = "layer"
        this.deck = []
        this.foundations = [
            [{number: 1, display: "A", suit: "♠️"}],
            [{number: 1, display: "A", suit: "♥️"}],
            [{number: 1, display: "A", suit: "♦️"}],
            [{number: 1, display: "A", suit: "♣️"}]
        ]
        this.maneuvers = [ [], [], [], [], [], [], [], [] ] // 8 empty maneuver slots
        for (let i = 2; i < 14; i++){
            let display
            switch (i) {
                case 11:
                    display = "J"
                    break
                case 12:
                    display = "Q"
                    break 
                case 13:
                    display = "K"
                    break
                default:
                    display = i
            }
            this.deck.push({number: i, display: display, suit: "♠️"})
            this.deck.push({number: i, display: display, suit: "♥️"})
            this.deck.push({number: i, display: display, suit: "♦️"})
            this.deck.push({number: i, display: display, suit: "♣️"})
        }
        this.shuffle()
    }

    /*
     * Shuffles the deck - implements Fisher-Yates, as demoed here https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
     */

    shuffle(){
        var i,j,x;
        for (i = this.deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1))
            x = this.deck[i]
            this.deck[i] = this.deck[j]
            this.deck[j] = x
        }
    }


    /*
     * Simple global getter - lazy, but effective
     */

    getState(){
        return {
            stage: this.stage,
            deck: this.deck,
            top: this.deck[0],
            foundations: this.foundations,
            maneuvers: this.maneuvers
        }
    }

    /*
     * terribly unoptimized code that checks if there are any valid moves left
     */

    checkCanMove(){
        let moves = 0
        for (let i = 0; i < 8; i++){
            if (this.maneuvers[i].size === 0){
                continue
            }
            let card = this.maneuvers[i][0]
            for (let j = 0; j < 4; j++){
                if (this.checkSequence(card, j)){
                    moves++
                }
            }
        }
        return moves > 0
    }

    /*
     * @param {Card} card: a card object representing what the player is trying to place - has suit, display, and number
     * @param {Number} zone: the foundation zone (from 0-3) on to which the player is trying to place the card
     */

    checkSequence(card, zone){
        if (this.stage != "sequence"){
            return false
        }
        let top = this.foundations[zone][this.foundations[zone].size - 1]
        return (top.suit === card.suit && top.number + 1 === card.number)
    }

    /*
     * @param {Number} maneuver: the maneuver zone (from 0-7) from which the player is trying to remove the card from
     * @param {Number} foundation: the foundation zone (from 0-7) on to which the player is trying to place the card
     */

    trySequence(maneuver, foundation){
        if (this.stage === "sequence"){
            let card = this.maneuvers[maneuver][0]
            if (this.checkSequence(card, foundation)){
                this.foundations[foundation].unshift(card)
                this.maneuvers[maneuver].shift()
                return true
            }
        }
        return false
    }

    /*
     * @param {Number} zone: the maneuver zone (from 0-7) on to which the player is trying to place the card
     */

    tryLayer(zone){
        if (this.stage === "layer" && this.deck.length > 0){
            this.maneuvers[zone].unshift(this.deck[0])
            this.deck.shift()
            if (this.deck.size === 0){
                this.stage === "sequence"
            }
            return true
        }
        return false
    }
}