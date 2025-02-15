import React from 'react';

// The Word component accepts a "text" prop and displays it.
const Word = ({ text, onClick, selected, correct }) => {
  var selectedClass = selected ? " selectred" : ""
  var correctClass = correct ? " corrent" : ""

  return (
    <label className={"word"+ selectedClass + correctClass} onClick={onClick}>
      <p>{text[0].toUpperCase() + text.substring(1)}</p>
    </label>
  );
};

export default Word;