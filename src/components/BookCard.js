import React from "react";
import CardButton from "./CardButton";

const BookCard = ({
  book,
  showFullDesc = true,
  addBookToShelf,
  deleteBookFromShelf = null
}) => {
  let { title, authors, desc, imageLinks, id, shelf } = book;

  desc = desc ? desc.slice(0, 150) + "  ..." : "No description";

  authors = authors ? "By " + authors.join(", ") : "No Information";

  //For homepage where all authors dont require

  authors = showFullDesc ? authors : book.authors[0];

  title = title ? title : "No Title Available";
  imageLinks = imageLinks
    ? imageLinks
    : "https://placeimg.com/150/150/people/sepia";
  return (
    <div className="col s12 m6 l4">
      <div className="card hoverable horizontal">
        <div className="card-image">
          <img
            className="responsive-img"
            src={imageLinks.smallThumbnail}
            alt={title}
          />
        </div>
        <div className="card-stacked">
          <div className="card-content ">
            <span className="card-title">{title}</span>
            <span className="flow-text author ">{authors}</span>

            {showFullDesc && <p>{desc}</p>}
          </div>
          <div className="card-action">
            <CardButton
              shelf={shelf}
              id={"toR"}
              onClick={() => addBookToShelf(id, "toR")}
            >
              To Read
            </CardButton>

            <CardButton
              shelf={shelf}
              id={"cR"}
              onClick={() => addBookToShelf(id, "cR")}
            >
              Currently Reading
            </CardButton>

            <CardButton
              shelf={shelf}
              id={"r"}
              onClick={() => addBookToShelf(id, "r")}
            >
              Read
            </CardButton>
            {deleteBookFromShelf && (
              <CardButton
                id={"delete"}
                onClick={() => deleteBookFromShelf(id)}
                extraClass="delete-book"
              >
                <i title="delete" className="material-icons">
                  delete
                </i>
              </CardButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
