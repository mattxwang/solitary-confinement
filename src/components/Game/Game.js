import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Card from '../Card/Card';

// const SUITS = {
//     SPADES: "♠",
//     HEARTS: "♥",
//     CLUBS: "♣",
//     DIAMONDS: "♦"
// }

const SUITS = {
    SPADES: "S",
    HEARTS: "H",
    CLUBS: "C",
    DIAMONDS: "D"
}

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
            stage: "layer",
            deck: this.generateShuffledDeck(),
            foundations: [
                [{number: 1, display: "A", suit: SUITS.SPADES}],
                [{number: 1, display: "A", suit: SUITS.HEARTS}],
                [{number: 1, display: "A", suit: SUITS.CLUBS}],
                [{number: 1, display: "A", suit: SUITS.DIAMONDS}]
            ],
            maneuvers: [ [], [], [], [], [], [], [], [] ], // 8 empty maneuver slots
            selectedManeuver: null
        };
    }
    resetGame = () => {
        this.setState({
            stage: "layer",
            deck: this.generateShuffledDeck(),
            foundations: [
                [{number: 1, display: "A", suit: SUITS.SPADES}],
                [{number: 1, display: "A", suit: SUITS.HEARTS}],
                [{number: 1, display: "A", suit: SUITS.CLUBS}],
                [{number: 1, display: "A", suit: SUITS.DIAMONDS}]
            ],
            maneuvers: [ [], [], [], [], [], [], [], [] ], // 8 empty maneuver slots
            selectedManeuver: null
        })
    }
    generateShuffledDeck = () => {
        let deck = []
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
            deck.push({number: i, display: display, suit: SUITS.SPADES})
            deck.push({number: i, display: display, suit: SUITS.HEARTS})
            deck.push({number: i, display: display, suit: SUITS.CLUBS})
            deck.push({number: i, display: display, suit: SUITS.DIAMONDS})
        }
        return this.shuffleDeck(deck)
    }

    shuffleDeck = deck => {
        let i,j,x;
        for (i = deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1))
            x = deck[i]
            deck[i] = deck[j]
            deck[j] = x
        }
        return deck
    }

    /*
     * @param {Card} card: a card object representing what the player is trying to place - has suit, display, and number
     * @param {Number} zone: the foundation zone (from 0-3) on to which the player is trying to place the card
     */

    checkSequence = (card, zone) => {
        let top = this.state.foundations[zone][0]
        return (top.suit === card.suit && top.number + 1 === card.number)
    }

    /*
     * @param {Number} maneuver: the maneuver zone (from 0-7) from which the player is trying to remove the card from
     * @param {Number} foundation: the foundation zone (from 0-7) on to which the player is trying to place the card
     */

    trySequence = (maneuver, foundation) => {
        if (this.checkSequence(this.state.maneuvers[maneuver][0], foundation)){
            let maneuvers = this.state.maneuvers
            let foundations = this.state.foundations
            foundations[foundation].unshift(maneuvers[maneuver].shift())
            this.setState({
                maneuvers: maneuvers,
                foundations: foundations
            })
        }
    }

    /*
     * @param {Number} zone: the maneuver zone (from 0-7) on to which the player is trying to place the card
     */

    tryLayer = zone => {
        if (this.state.deck.length > 0){
            let deck = this.state.deck
            let maneuvers = this.state.maneuvers
            maneuvers[zone].unshift(deck.shift())
            this.setState({
                maneuvers: maneuvers,
                deck: deck
            })
            if (deck.length === 0){
                this.setState({stage: "sequence"})
            }
        }
    }

    getNumAvailableMoves = () => {
        let moves = 0
        for (let i = 0; i < this.state.maneuvers.length; i++){
            if (this.state.maneuvers[i].length === 0){
                continue
            }
            let card = this.state.maneuvers[i][0]
            for (let j = 0; j < this.state.foundations.length; j++){
                if (this.checkSequence(card, j)){
                    moves++
                }
            }
        }
        return moves
    }

    getGameState = () => {
        if (!this.getNumAvailableMoves()){
            for (let i = 0; i < 4; i++){
                if (this.state.foundations[i].length !== 13){
                    return "unwinnable"
                }
            }
            return "won!"
        }
        else{
            return "winnable"
        }
    }

    handleManeuver = zone => {
        if (this.state.stage === "layer"){
            this.tryLayer(zone)
        }
        else if (this.state.stage === "sequence" && this.state.maneuvers[zone].length){
            this.setState({selectedManeuver: zone})
        }
    }

    handleFoundation = zone => {
        if (this.state.stage === "sequence" && this.state.selectedManeuver !== null){
            this.trySequence(this.state.selectedManeuver, zone)
        }
    }

    render(){
		return (
            <Container className="game-container" fluid>
                <Row>
                    <Col md={4}>
                        <Card nomargin card={this.state.deck[0]}/>
                        <hr />
                        <ul className="list-unstyled mt-1">
                            <li>stage: {this.state.stage}</li>
                            <li>cards left in deck: {this.state.deck.length}</li>
                            {this.state.stage === "sequence" && <li>game state: {this.getGameState()}</li>}
                            {this.state.selectedManeuver !== null && <li>selected maneuver: {this.state.selectedManeuver}</li>}
                        </ul>
                        <Button className="mt-2" onClick={this.resetGame}>Restart Game</Button>
                    </Col>
                    <Col md={8}>
                        <Row>
                            {
                                [0,1,2,3].map((value) => {
                                    return (
                                        <Col key={value}>
                                            <Card 
                                                card={this.state.foundations[value][0]} 
                                                num={value} 
                                                handler={(zone) => this.handleFoundation(zone)}/>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <hr />
                        <Row className="my-2">
                            {
                                [0,1,2,3].map((value) => {
                                    return (
                                        <Col key={value}>
                                            <Card 
                                                card={this.state.maneuvers[value][0]} 
                                                num={value} 
                                                handler={(zone) => this.handleManeuver(zone)}/>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <Row className="my-2">
                            {
                                [4,5,6,7].map((value) => {
                                    return (
                                        <Col key={value}>
                                            <Card 
                                                card={this.state.maneuvers[value][0]} 
                                                num={value} 
                                                handler={(zone) => this.handleManeuver(zone)}/>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Game;