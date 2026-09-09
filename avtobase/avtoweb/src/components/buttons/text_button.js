import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';

// Reusable button that blocks double submits. `isDisabled` is now actually bound
// to the button, and the pending timeout is cleared on unmount.
const TextButton = ({ label, onClick, cooldownMs = 1000, ...buttonProps }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleClick = (event) => {
    if (isDisabled) {
      return;
    }
    setIsDisabled(true);
    onClick?.(event);
    timeoutRef.current = setTimeout(() => setIsDisabled(false), cooldownMs);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      {...buttonProps}
      disabled={isDisabled || buttonProps.disabled}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};

export default TextButton;
