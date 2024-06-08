import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const [query, setQuery] = useState("");
  const [bookData, setBookData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(bookData);

  useEffect(() => {
    if (query !== "") {
      setLoading(true);
      fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setBookData(data.docs);
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setBookData([]);
      setError(null);
    }
  }, [query]);

  const handleBookShelf = (book) => {
    const bookDetails = {
      title: book?.title,
      author_name: book?.author_name,
      first_publish_year: book?.first_publish_year,
    };

    console.log("Book to add:", bookDetails);

    let Bookself = JSON.parse(localStorage.getItem("Bookself")) || [];
    console.log("Current Bookself:", Bookself);

    Bookself.push(bookDetails);
    console.log("Updated Bookself:", Bookself);

    localStorage.setItem("Bookself", JSON.stringify(Bookself));
    console.log(
      "Bookself saved to localStorage:",
      localStorage.getItem("Bookself")
    );

    Swal.fire({
      title: "Good job!",
      text: `"${book.title}" has been added to Bookself`,
      icon: "success",
    });
  };

  return (
    <div>
      <div className="my-4 p-2 flex  justify-between shadow-xl rounded-sm items-center">
        <Link to="/" className="text-xl font-semibold text-primary ps-4">
          BookSelf
        </Link>

        <Link to="mybookself" className="btn text-white btn-success ">
          My Bookshelf
        </Link>
      </div>

      {/* Search Bar */}
      <div className=" flex justify-center">
        <label className="input input-bordered input-primary flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search By Book name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      {/* card */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4 justify">
        {loading ? (
          <div className=" ">
            <p>Loading books...</p>
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : error ? (
          <p>Error: {error}</p>
        ) : bookData.length > 0 ? (
          bookData.map((book) => (
            <div
              key={book.key}
              className="card shadow-lg p-4 rounded-md border "
            >
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-sm">Author: {book?.author_name}</p>
              <p className="text-sm">
                First Published: {book?.first_publish_year}
              </p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => {
                    handleBookShelf(book);
                  }}
                  className="btn btn-primary"
                >
                  Add to BookShelf
                </button>
              </div>
            </div>
          ))
        ) : (
          <p> Search books </p>
        )}
      </div>
    </div>
  );
};

export default Home;
