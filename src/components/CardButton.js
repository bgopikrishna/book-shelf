import React from "react";

const CardButton = ({ shelf='', id, onClick, children, extraClass = ""}) => {
  return (
    <button
      className={"btn btn-small btn-flat " + extraClass}
      onClick={onClick}
      title="Delete Book"
      disabled={shelf === id}
     
    >
      {children}
    </button>
  );
};

export default CardButton;
