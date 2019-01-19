import React from "react";

const BookCard = ({ book, handleCounter }) => {
  let { title, authors, desc, imageLinks } = book;
  desc = desc ? desc.slice(0, 200) + "..." : "No description";
  authors = authors ? "By " + authors.join(", ") : "No Information";
  return (
    <div className="col s12 m6 l4">
      <div className="card hoverable horizontal">
        <div className="card-image">
          <img src={imageLinks.smallThumbnail} alt={title} />
        </div>
        <div className="card-stacked">
          <div className="card-content ">
            <span className="card-title">{title}</span>
            <span className="flow-text author">{authors}</span>
            <p>{desc}</p>
          </div>
          <div className="card-action">
            <button className="btn btn-small btn-flat" href="#">
              To Read
            </button>
            <button
              className="btn btn-small btn-flat"
              href="#"
              onClick={handleCounter}
            >
              Currently Reading
            </button>
            <button className="btn btn-small btn-flat" disabled href="#">
              Read
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
