/* eslint-disable no-loop-func */
/* eslint-disable no-unused-expressions */
import { click } from "@testing-library/user-event/dist/click";
import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./card";

export const App = () => {
  // state for scoreboard
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // state for winning
  const [won, setWon] = useState(false)

  // shuffled state
  const [shuffled, setShuffled] = useState(false);

  // array of selected cards
  const [selected, setSelected] = useState([]);

  // temp selected
  const [tempSelected, setTempSelected] = useState([]);

  // true or false for matched cards
  const [matched, setMatched] = useState(false);

  // cards in deck
  const [cards, setCards] = useState([]);

  // allow click
  const [clickable, setClickable] = useState(true);

  const symbols = ["!","@","£","$","%","^","&","*","?"]
  // temp array - not in state due to re-rendering
  const theCards = [];

  // loop through 9 photos add to temp array
  for (let i = 0; i < 9; i++) {
    theCards.push(symbols[i]);
  }

  // add temp array to state but only once
  useEffect(() => {
    setCards(theCards);
  }, []);

  // waits for new card added to selected and checks it hasn't already been selected.
  // updates matched as true if duplicate in selected array
  useEffect(() => {
    const set = [...new Set(selected)];
    setCurrentScore(selected.length)
    // check for length. Set only returns unique items in an array
    set.length !== selected.length ?
      setMatched(true) :
      setMatched(false)
  }, [selected]);

  // add temp array to state on complete
  useEffect(() => {
    matched === true && reset();
    // setTimeout(() => reset(), 2000)
  }, [matched]);

  useEffect(() => {
    currentScore > bestScore && setBestScore(currentScore);
  },[currentScore])

  // check for a win
  // improve what happens after
  useEffect(()=>{
    won === true && reset()
  }, [won])

  // check if user has won, if not add card to main selection array
  useEffect(() => {
    const set = [...new Set(tempSelected)];
    set.length === 9 ? setWon(true) : setWon(false);
    // add card to selected cards array
    tempSelected[tempSelected.length - 1] !== undefined &&
      setSelected([...selected, tempSelected[tempSelected.length - 1]]);
  }, [tempSelected])

  // useEffects above
  // ---------------
  // functions below

  // event listner for clicking each card
  const cardClick = (src) => {
    // shuffle cards
    shuffle();
    setTempSelected([...tempSelected, src]);
  };
  
  // rest selected cards
  const reset = () => {
    setClickable(false);
    setTimeout(() => {
      setSelected([]);
      setTempSelected([]);
      setMatched(false);
      setWon(false);
      setClickable(true);
    }, 1500);
  };

  // shuffle cards, render page
  const shuffle = () => {
    // shuffle using sort
    setCards(cards.sort(() => Math.random() - 0.5));
    // updates render
    setShuffled(shuffled === true ? false : true);
  };

  return (
    <div className="container">
      {cards.map((img) => {
        return (
          <Card
            key={img}
            image={img}
            onClick={cardClick}
            clickable={clickable}
          />
        );
      })}
      <h3>Best score: {bestScore}</h3>
      <h3>Current score: {currentScore}</h3>
      {matched === false && won === false ? (
        <h3>Still in</h3>
      ) : matched === true ? (
        <h3>Game over</h3>
      ) : (
        <h3>You won</h3>
      )}
    </div>
  );
};
