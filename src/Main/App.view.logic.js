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
    console.log(card.target.classList);

    if(!this.state.matchCard_selected || this.state.matchCard_ID === cardID){
      //turn this to a function called setMatchCard
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

            //if Match card is selected again remove from state it as matchCard and reset everything else
            if(!this.state.matchCard_selected){
              this.setState(prevState => (

                  {
                    matchCard: null,
                    matchCard_selected: false,
                    matchingCard:null,
                  }))
            }
          });
    }
    else{
      //turn this to a function call CompareCards
      this.setState(prevState => (

          {
            matchingCard: cardValue,
            matchingCard_ID:cardID,
          }), ()=>
      {
        console.log(this.state.matchingCard);
        console.log("matching card selected "+this.state.matchCard_selected + " with ID: "+ this.state.matchingCard_ID);
      });

    }

    //this.increment()
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