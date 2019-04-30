import React, { Component } from 'react';
import Navbar from './Navbar';
import Container from './Container';
import images from '../images';

class ClickyGame extends Component {
  state = {
    score: 0,
    highScore: 0,

    // stores the class value to assign to navMessage based on a good or bad click
    navMsgColor: '',

    // contains intro, success, and failure message
    navMessage: "Gotta click em' all!  Click a Pokemon to start the game!",

    // contains an array of image urls
    allCharacters: this.shuffleArray(),

    // will track  each clicked element.
    wasClicked: [],

    // shakes the container on an incorrect guess if set to true
    shake: false
  };

  clickEvent = this.checkClicked.bind(this);

  // shuffle array of images when the DOM loads and when an image is clicked
  shuffleArray() {
    // create copy of current array to modify it by value
    const newArr = images.slice();

    // store shuffled array
    const shuffleArr = [];

    while (newArr.length > 0) {
      shuffleArr.push(newArr.splice(Math.floor(Math.random() * newArr.length), 1)[0]);
    }

    return shuffleArr;
  }

  checkClicked(clickedElem) {
    // create copy of wasClicked array to modify it by value.  wasClicked stores all previously clicked images
    const prevState = this.state.wasClicked.slice();

    // shuffle images
    const shuffled = this.shuffleArray();

    // track score
    let score = this.state.score;
    let highScore = this.state.highScore;

    // if clicked item is not in wasClicked, score is increased
    if (!this.state.wasClicked.includes(clickedElem)) {
      // if score and highScore are the same, then there is a new highScore value
      if (score === highScore) {
        score++;
        highScore++;

        // if not equal, then only increase the score value
      } else {
        score++;
      }

      // add clicked item to wasClicked 
      prevState.push(clickedElem);
    }

    // reset current score if same element was clicked twice
    if (this.state.wasClicked.includes(clickedElem)) {
      let score = 0;
      return this.setState({
        score: score,
        highScore: highScore,
        navMsgColor: 'incorrect',
        navMessage: 'Nope!  Streak is over, start again.',
        allCharacters: shuffled,
        wasClicked: [],
        shake: true
      });
    }

    // if this runs, then the same element has not been clicked and score should be increased
    this.setState({
      score: score,
      highScore: highScore,
      navMsgColor: 'correct',
      navMessage: 'Nice, keep it going!',
      allCharacters: shuffled,
      wasClicked: prevState,
      shake: false
    });

    // remove the green correct indicator on a successful click after .5s to re-render class on each success
    return setTimeout(() => this.setState({ navMsgColor: '' }), 500);
  }

  // renders score to the navbar.
  render() {
    const state = this.state;
    return (
      <div>
         <Navbar
          score={state.score}
          highScore={state.highScore}
          navMessage={state.navMessage}
          navMsgColor={state.navMsgColor}
        />
      
        <Container
          shake={state.shake}
          characters={state.allCharacters}
          clickEvent={this.clickEvent}
        />
  
      </div>
    );
  }
}

export default ClickyGame;