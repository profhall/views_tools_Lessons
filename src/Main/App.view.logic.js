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
      matchCardNodeElement:null,
      correctMatches: 0,
      showCard: true
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
    this.matchingCardElementHandler()

    this.state.matchCardNodeElement.style.backgroundColor = "black";
    this.state.matchingCardNodeElement.style.backgroundColor = "black";
    console.log("Heeey! You get a point!");



  };

  resetPicks = () =>{
    this.setState(prevState => (

        {
          matchCard: null,
          matchCard_selected: false,
          matchCardNodeElement:null,
          matchingCard:null,
          matchingCardNodeElement:null,
          matchingCard_ID:null,
        }))
  };

  matchingCardElementHandler = () =>
  {
    this.state.matchingCardNodeElement.style.backgroundColor = "red";
    if (this.state.previousMatchingCardNodeElement) {
  // console.log(this.state.previousMatchingCardNodeElement)
      this.state.previousMatchingCardNodeElement.style.backgroundColor = "#F96302"
    }
  };

  decrementScore = () => {
    this.setState(prevState => ({
      correctMatches: prevState.correctMatches === 0 ? 0 :prevState.correctMatches - 1
    }));
    console.log("Sorry! You lost a point!");
    this.matchingCardElementHandler()
  };

  setMatchCard = (cardValue,cardID,card) => {
    const button = card;
    // console.log(button);

    this.setState(prevState => (

            {
              matchCardNodeElement:button,
              matchCard: cardValue,
              matchCard_ID:cardID,
              matchCard_selected: !prevState.matchCard_selected
            }),
        ()=>
        {
          console.log(this.state.matchCardNodeElement);
          console.log("match card selected "+this.state.matchCard_selected + " with ID: "+ this.state.matchCard_ID);
          this.state.matchCardNodeElement.style.backgroundColor = "yellow";

          //if Match card is selected again remove from state it as matchCard and resetPicks everything else
          if(!this.state.matchCard_selected){
            this.resetPicks()
          }
        });
  };

  compareCards = (cardValue,cardID, card) => {
    let c =card;
    this.setState(prevState=>(

        {
          matchingCard: cardValue,
          matchingCard_ID:cardID,
          matchingCardNodeElement: c,
          previousMatchingCardNodeElement: prevState.matchingCardNodeElement ? prevState.matchingCardNodeElement : null
        }
        ), ()=>
    {
      console.log("matching card is "+ this.state.matchingCard + " with ID: "+ this.state.matchingCard_ID);
      // console.log("matching card selected "+this.state.matchCard_selected + " with ID: "+ this.state.matchingCard_ID);

      if(this.state.matchingCard === this.state.matchCard){
        console.log(c);
        this.incrementScore();
        // this.state.matchCardNodeElement.style.backgroundColor = "black";
        // this.state.matchingCardNodeElement.style.backgroundColor = "black";
        this.resetPicks();

      }
      else{
        this.decrementScore();
      }

    });
  };
  wasButtonClicked = clicked =>{
    console.log('hello from WasButtonClicked')
    let cardValue = '';
    let cardID = '';
    console.log(clicked)
    if(clicked.target.localName !== 'button'){
      cardValue = clicked.target.parentElement.innerText;
      cardID = clicked.target.parentElement.id;
      clicked = clicked.target.parentElement
      // console.log(clicked)

    }
    else{
      // console.log(card.target.id)
      cardValue = clicked.target.innerText;
      cardID = clicked.target.id;
      clicked = clicked.target
      // console.log(clicked)

    }

    // console.log(clicked)
    return [cardValue ,cardID, clicked]

  };

  cardClick = card =>{
    console.log("card Clicked ");
    // console.log(card);
    // console.log(card.target.localName);

    const cardInfo = this.wasButtonClicked(card);
    const cardValue = cardInfo[0];
    const cardID = cardInfo[1];

    // console.log(cardValue);
    // console.log(cardID);
    // console.log(card.target.classList);
    if(!this.state.matchCard_selected || this.state.matchCard_ID === cardID){
      this.setMatchCard(cardValue,cardID,cardInfo[2] )
    }
    else {
      // console.log(card);

      this.compareCards(cardValue, cardID, cardInfo[2])
    }

  };

  render() {
    // console.log("render loaded");
    return <App
        cardClick={this.cardClick}
        isLoading = {this.state.isLoading}
        isReady = {this.state.isReady}
        score={this.state.correctMatches}
        matchCardValue={this.state.matchCard ? (this.state.matchCard + " :: " + this.state.matchCard_ID) : 'not selected' }
        compareCardValue={this.state.matchingCard ? this.state.matchingCard + " :: " + this.state.matchingCard_ID: 'not selected' }
        matchValues={this.state.matchValues}
        disabledCards={this.state.disableCards}
        showCard = {this.state.showCard}
        {...this.props}
    />
  }
}