import React, { useState } from 'react';  // Import useState
import Word from './Word';
import Validator from './Validator';

const RULES = [
  {
    "text": "Não vivos",
    "words": ["esqueleto", "fantasma", "golem", "zumbie"]
  },
  {
    "text": "Vive no deserto",
    "words": ["camelo", "escorpiao gigante", "mumia", "verme purpura"]
  },
  {
    "text": "São Bestas",
    "words": ["basilisco", "hydra", "morcego", "urso"]
  },
  {
    "text": "Vindo da fey wild",
    "words": ["bruxa", "driade", "fada", "unicornio"]
  }
]

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

function mergeWords(rules) {
  return rules.reduce((acc, rule) => acc.concat(rule.words), []);
}

function mergeAndShuffleWords(rules) {
  const allWords = mergeWords(rules);

  shuffleArray(allWords);

  return allWords.map(word => {return { text: word, selected: false, correct: false }});
}


const Game = () => {
  const [wordCount, setWordCount] = useState(1)
  const [shuffledWoprds, setShuffledWoprds] = useState(mergeAndShuffleWords(RULES))
  const [validators, setValidators] = useState([
    { status: "closed", words: [] },
    { status: "closed", words: [] },
    { status: "closed", words: [] },
    { status: "closed", words: [] }
  ]);

  function guess(word) {
    const updatedValidators = [...validators];
  
    const index = validators.findIndex( (item) => item.status == "closed" && item.words.length < 4)
  
    if (index === -1) { return false }
    
    updatedValidators[index].words.push(word)
  
    setValidators(updatedValidators)
    setWordCount(wordCount + 1)
  }

  function select(word) {
    const updatedShuffledWoprds = [...shuffledWoprds];

    const index = updatedShuffledWoprds.findIndex( (item) => item.text == word)

    updatedShuffledWoprds[index].selected = true

    console.log(updatedShuffledWoprds)
    setShuffledWoprds(updatedShuffledWoprds)
  }

  function cofnirmWords(words) {
    const updatedShuffledWoprds = [...shuffledWoprds].map( (item) => {
      if(words.includes(item.text)) {
        item.correct = true
      }

      return item
    })

    setShuffledWoprds(updatedShuffledWoprds)
  }

  function unslect() {
    const updatedShuffledWoprds = [...shuffledWoprds].map( (item) => {
      item.selected = false
      return item
    })

    setShuffledWoprds(updatedShuffledWoprds)
  }

  function validateGuess() {
    const updatedValidators = [...validators];
    var tempWordCount = 1

    validators.map((guess, index) => {
      var rules = RULES.filter( (rule) => {
        console.log(guess.words.sort(),  rule.words, JSON.stringify(rule.words) == JSON.stringify(guess.words.sort()))
        return JSON.stringify(rule.words) == JSON.stringify(guess.words.sort())
      })
      
      console.log(rules.length)
      if (rules.length > 0) {
        updatedValidators[index].status = "open"
        cofnirmWords(guess.words)
        tempWordCount = tempWordCount + 4
      } else {
        updatedValidators[index].words = []
      }
    });

    if (updatedValidators == validators) { return false }

    setValidators(updatedValidators)
    unslect()
    setWordCount(tempWordCount)
  }
  

  const handdleClickWord = (word) => {
    if (word.selected || word.correct) { return false }

    guess(word.text)
    select(word.text)
    if (wordCount >= 16) { validateGuess() }
  }

  return (
    <div className='game'>
      <div className='words'>
        {shuffledWoprds.map((word, index) => (
          <Word key={index} text={word.text} selected={word.selected} correct={word.correct} onClick={handdleClickWord.bind(null, word)} />
        ))}
      </div>
      <div className='validators'>
        {validators.map((validator, index) => (
          <Validator key={index} status={validator.status} words={validator.words} />
        ))}
      </div>
    </div>
  );
};

export default Game;