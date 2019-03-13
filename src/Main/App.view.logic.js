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
      matchCard_selected: false,
      matchingCard:null,
      correctMatches: 0
    };
    this.incrementScore = this.incrementScore.bind(this)
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

  incrementScore = () => {
    this.setState(prevState => ({
      correctMatches: prevState.correctMatches + 1
    }));
    console.log("Heeey! You get a point!");

  };

  resetPicks = () =>{
    this.setState(prevState => (

        {
          matchCard: null,
          matchCard_selected: false,
          matchingCard:null,
        }))
  };

  decrementScore = () => {
    this.setState(prevState => ({
      correctMatches: prevState.correctMatches === 0 ? 0 :prevState.correctMatches - 1
    }));
    console.log("Sorry! You lost a point!");

  };

  setMatchCard = (cardValue,cardID) => {
    this.setState(prevState => (

            {
              matchCard: cardValue,
              matchCard_ID:cardID,
              matchCard_selected: !prevState.matchCard_selected
            }),
        ()=>
        {
          console.log(this.state.matchCard);
          console.log("match card selected "+this.state.matchCard_selected + " with ID: "+ this.state.matchCard_ID);

          //if Match card is selected again remove from state it as matchCard and resetPicks everything else
          if(!this.state.matchCard_selected){
            this.resetPicks()
          }
        });
  };

  compareCards = (cardValue,cardID) => {
    this.setState(prevState => (

        {
          matchingCard: cardValue,
          matchingCard_ID:cardID,
        }), ()=>
    {
      console.log("matching card is "+ this.state.matchingCard + " with ID: "+ this.state.matchingCard_ID);
      // console.log("matching card selected "+this.state.matchCard_selected + " with ID: "+ this.state.matchingCard_ID);

      if(this.state.matchingCard === this.state.matchCard){
        this.incrementScore();
        this.resetPicks();
        //run function to disable cards
      }
      else{
        this.decrementScore()
      }

    });
  };

  cardClick = card =>{
    const cardValue = card.target.innerText;
    const cardID = card.target.id;
    console.log("card Clicked ");
    // console.log(cardValue);
    // console.log(card.target.classList);
    if(!this.state.matchCard_selected || this.state.matchCard_ID === cardID){
      this.setMatchCard(cardValue,cardID)
    }
    else{
      this.compareCards(cardValue,cardID)
    }
  };

  render() {
    console.log("render loaded");
    return <App
        cardClick={this.cardClick}
        isLoading = {this.state.isLoading}
        isReady = {this.state.isReady}
        score={this.state.correctMatches}
        matchCardValue={this.state.matchCard ? (this.state.matchCard + " :: " + this.state.matchCard_ID) : 'not selected' }
        compareCardValue={this.state.matchingCard ? this.state.matchingCard + " :: " + this.state.matchingCard_ID: 'not selected' }
        matchValues={this.state.matchValues}
        {...this.props}
    />
  }
}