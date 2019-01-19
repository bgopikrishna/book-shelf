import React from "react";

const BookCard = ({ book, handleCounter, addBookToShelf }) => {
  let { title, authors, desc, imageLinks } = book;

  desc = desc ? desc.slice(0, 200) + "..." : "No description";
  authors = authors ? "By " + authors.join(", ") : "No Information";
  title = title ? title : "No Title Available";
  imageLinks = imageLinks
    ? imageLinks
    : "https://placeimg.com/150/150/people/sepia";
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
            <button
              className="btn btn-small btn-flat"
              href="#"
              id="toRead"
              onClick={() => addBookToShelf(book.id, "toR")}
              disabled={
                book.shelf === "toR" //toR means to Read
              }
            >
              To Read
            </button>
            <button
              className="btn btn-small btn-flat"
              href="#"
              onClick={() => addBookToShelf(book.id, "cR")}
              id="currentlyReading"
              disabled={
                book.shelf === "cR" //cr means currently Reading
              }
            >
              Currently Reading
            </button>
            <button
              className="btn btn-small btn-flat"
              disabled={book.shelf === "r"}
              href="#"
              id="read"
              onClick={
                () => addBookToShelf(book.id, "r") // Here r means Read Read
              }
            >
              Read
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
