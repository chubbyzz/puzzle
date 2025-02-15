import React from 'react';
import { ReactComponent as OpenSVG } from './icons/open.svg'; // Import SVG as a component
import { ReactComponent as CloseSVG } from './icons/close.svg'; // Import SVG as a component

 

// The Word component accepts a "text" prop and displays it.
const Validator = ({ words, status }) => {
  var openClass = status == "open" ? " open" : ""

  return (
    <div className={"validator" + openClass} >
      <div className='validator-words'> 
          {
            words.map((word, index) => (
              <span className='word'>{word}</span>
            ))
          }
      </div>
      <div className='icon'>
          { status == "open" ? <OpenSVG className='open' width="50" height="50"/> : <CloseSVG className='close' width="50" height="50"/> }
      </div>
    </div>
   
  );
};

export default Validator;