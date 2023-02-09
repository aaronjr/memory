/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
/* eslint-disable no-unused-expressions */
import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./card";

export const App = () => {

  // state for scoreboard
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // state for winning
  const [won, setWon] = useState(false);

  // state for matched cards
  const [matched, setMatched] = useState(false);

  // selected cards array
  const [selected, setSelected] = useState([]);

  // cards in deck, 9 unique symbols
  const [cards, setCards] = useState([
    "!",
    "@",
    "£",
    "$",
    "%",
    "^",
    "&",
    "*",
    "?",
  ]);

  // shuffled state
  const [shuffled, setShuffled] = useState(false);

  // allow click
  const [clickable, setClickable] = useState(true);

  // add temp array to state on complete
  useEffect(() => {
    matched === true && reset();
    // setTimeout(() => reset(), 2000)
  }, [matched]);

  // check for a win
  // improve what happens after
  useEffect(() => {
    won === true && reset();
  }, [won]);

  // updates best score to current score if current is bigger
  useEffect(() => {
    currentScore > bestScore && setBestScore(currentScore);
  }, [currentScore]);

  useEffect(() => {
    // create a set
    const set = [...new Set(selected)];
    // check for length
    if (selected.length === set.length) {
      // if same length, there are no matches
      setMatched(false);
      // set scrore, with set of length
      setCurrentScore(set.length);
      // if 9 unique items, user has won
      set.length === 9 ? setWon(true) : setWon(false);
    } else {
      // if lengths don't match there must be a duplicate
      setMatched(true);
    }
  }, [selected]);

  // useEffects above
  // ---------------
  // functions below

  // event listner for clicking each card
  const cardClick = (src) => {
    // shuffle cards
    shuffle();
    // add card to array of selected cards
    setSelected([...selected, src]);
  };

  // shuffle cards, render page
  const shuffle = () => {
    // shuffle using sort
    setCards(cards.sort(() => Math.random() - 0.5));
    // updates render
    setShuffled(shuffled === true ? false : true);
  };

  // rest selected cards
  const reset = () => {
    setClickable(false);
    setTimeout(() => {
      setSelected([]);
      setMatched(false);
      setWon(false);
      setClickable(true);
    }, 1500);
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
