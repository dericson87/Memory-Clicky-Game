import React from 'react';
import './Navbar.css';
import pokemon from '../../images/logopokemon.png';

const Navbar = props => (
  
<div className="navbar ">
 <img class="logo" src={pokemon} alt="Pokemon"/>
    
  <div className={props.navMsgColor}><br/><br/>{props.navMessage}</div>
    <div>
      <br/><br/>Score: {props.score} <br/> <br/>High Score: {props.highScore}
    </div>
   
   
  </div>
  
);

export default Navbar;