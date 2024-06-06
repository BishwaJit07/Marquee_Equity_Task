import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Mybookself = () => {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookSelfFromLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setBookData(cart);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookSelfFromLocalStorage();
  }, []);

  return (
    <div>
      <div className="my-4 p-2 flex justify-between shadow-xl rounded-sm items-center">
        <Link to="/" className="text-xl font-semibold text-primary ps-4">
          BookSelf
        </Link>

        <Link to="/" className="btn text-white btn-success ">
          Home
        </Link>
      </div>
      <h1 className="text-xl text-center font-semibold underline p-4">
        My BookSelf
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {loading ? (
          <div className="flex">
            <p>Loading books... </p>
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : bookData.length > 0 ? (
          bookData.map((book, index) => (
            <div key={index} className="card shadow-lg p-4 rounded-md border ">
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-sm">Author: {book?.author_name}</p>
              <p className="text-sm">
                First Published: {book?.first_publish_year}
              </p>
            </div>
          ))
        ) : (
          <p>No books in the cart</p>
        )}
      </div>
    </div>
  );
};

export default Mybookself;
