import React from "react";

const moveCursorToEnd = (elRef: React.MutableRefObject<any>) => {
  elRef.current.focus();
  elRef.current.setSelectionRange(
    elRef.current.value.length,
    elRef.current.value.length
  );
};

export default moveCursorToEnd;
