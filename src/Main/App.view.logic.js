import React from 'react'
import App from './App.view.js'

export default class AppLogic extends React.Component {
  constructor(props){
    super(props);
    console.log("Hi from constructor")
    this.state = {
      isLoading : true,
      isReady : false
    };

  }

  componentDidMount() {

    setTimeout(function () {
      this.setState({isLoading:false, isReady:true}, ()=>{console.log("Hello after state set")});
    }.bind(this), 3000);

    console.log("Hello from after mounting")
  }


  cardClick = card =>{
    console.log("card Clicked ");
    console.log(card.target);
  };

  render() {
    console.log("Hello from render")
    return <App
        cardClick={this.cardClick}
        isLoading = {this.state.isLoading}
        isReady = {this.state.isReady}
        {...this.props}
    />
  }
}