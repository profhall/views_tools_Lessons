import React from 'react'
import App from './App.view.js'
import { matchItems } from '../defaultProps';


export default class AppLogic extends React.Component {
  constructor(props){
    super(props);
    console.log("Hi from constructor")
    this.state = {
      matchValues:null,
      isLoading : true,
      isReady : false,
      matchCard: null,
      matchCard_selected: null,
      matchingCard:null,
      correctMatches: 0
    };
    this.increment = this.increment.bind(this)
    this.shuffle = require('shuffle-array')


  }

  async componentDidMount() {

    setTimeout(function () {
      this.setState(
          {
            isLoading:false,
            isReady:true,
            matchValues:this.shuffle(matchItems)
          },
          ()=>{console.log("Hello after state set")});
    }.bind(this), 1500);



    console.log("Hello from after mounting")
  }

  increment = () => {
    this.setState(prevState => ({
      correctMatches: prevState.correctMatches + 1
    }));
    console.log("increment ");

  };

  decrement = () => {
    this.setState(prevState => ({
      correctMatches: prevState.correctMatches - 1
    }));
    console.log("decrement ");

  };

  cardClick = card =>{
    const cardValue = card.target.innerText;
    const cardID = card.target.id;
    console.log("card Clicked ");
    console.log(cardValue);
    console.log(card.target);

    if(!this.state.matchCard_selected){

      this.setState(prevState => (

          {
            matchCard: cardValue,
            matchCard_ID:cardID,
            matchCard_selected: !prevState.matchCard_selected
          }),
          ()=>
          {
            console.log(this.state.matchCard);
            console.log("is match card selected "+this.state.matchCard_selected + " with ID: "+ this.state.matchCard_ID);
          });
    }
    else{
      console.log(this.state.matchCard);
    }

    this.increment()
  };

  render() {
    console.log("render loaded");
    return <App
        cardClick={this.cardClick}
        isLoading = {this.state.isLoading}
        isReady = {this.state.isReady}
        score={this.state.correctMatches}
        matchCardValue={this.state.matchCard ? (this.state.matchCard + " :: " + this.state.matchCard_ID) : 'not selected' }
        compareCardValue={this.state.matchCard_selected ? "matchingCard" : 'not selected' }
        matchValues={this.state.matchValues}
        {...this.props}
    />
  }
}