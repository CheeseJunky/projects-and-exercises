import React, { useState } from 'react';

const TextButton = ({ label, onClick }) => {
    const [isDisabled, setIsDisabled] = useState(false);

    const handleClick = () => {
      if (!isDisabled) {
        setIsDisabled(true);
        onClick();
        setTimeout(() => setIsDisabled(false), 1000);   // spam timeout
      }
    };

  return (
    <button className="text-button" onClick={handleClick}>
      {label}
    </button>
  );
};

export default TextButton;