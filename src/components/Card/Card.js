import React, { Component } from 'react';

class Card extends Component {
    handleClick = () => {
        if (this.props.handler){
            this.props.handler(this.props.num)
        }
    }
    render(){
        let marginControl = !this.props.nomargin ? "mx-auto" : ""
        if (!this.props.card){
            return <img 
                className={"img-fluid card " + marginControl} 
                src={process.env.PUBLIC_URL + '/cards/B.svg'} 
                alt="Card back" 
                onClick={this.handleClick}
            />
        }
        return (
            <img 
                className={"img-fluid card " + marginControl}
                src={process.env.PUBLIC_URL + '/cards/' + this.props.card.display + this.props.card.suit + '.svg'} 
                alt={"Playing card, " + this.props.card.display + " of " + this.props.card.suit}
                onClick={this.handleClick}
            />
        )
    }
}

export default Card;