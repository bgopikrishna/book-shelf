import React from 'react'

const SearchForm = ({handleSubmit,handleChange,searchField}) => {
  return (
    <form onSubmit={handleSubmit} className="row">
          <div className="input-field">
            <input
              type="search"
              name="search"
              id="search"
              value={searchField}
              onChange={handleChange}
              placeholder="Search a book by author or title"
            />
            <button type="submit" className="btn z-depth-0">
              <i className="material-icons">search</i>
            </button>
          </div>
        </form>
  )
}

export default SearchForm
