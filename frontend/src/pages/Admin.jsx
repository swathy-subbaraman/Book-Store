import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDeleteSweep } from "react-icons/md";
import { AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { Menu, MenuItem, Button } from "@mui/material";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentIndexFiction, setCurrentIndexFiction] = useState(0);
  const [currentIndexEducation, setCurrentIndexEducation] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    setIsAuthenticated(false);
    handleMenuClose();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery) ||
      book.author.toLowerCase().includes(searchQuery)
  );
  // Split books into Fiction and Education categories
  const fictionBooks = filteredBooks.slice(0, 8);
  const educationBooks = filteredBooks.slice(8);

  const handleNext = (setCurrentIndex, currentIndex, booksLength) => {
    if (currentIndex + 4 < booksLength) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const handlePrevious = (setCurrentIndex, currentIndex) => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  const renderBooks = (books, currentIndex, setCurrentIndex, genre) => (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-amber-600">{genre}</h2><br></br>
      <div className="relative">
        {currentIndex > 0 && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
            <IoIosArrowBack
              onClick={() => handlePrevious(setCurrentIndex, currentIndex)}
              className="text-4xl text-gray-600 cursor-pointer hover:text-gray-800 transition duration-200"
            />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.slice(currentIndex, currentIndex + 4).map((book) => (
            <div
              key={book._id}
              className="open-book border rounded-lg shadow-lg flex flex-col sm:flex-row bg-white"
            >
              {/* Left side with book cover */}
              <div className="p-4 bg-gray-100 flex justify-center items-center rounded-t-lg sm:rounded-l-lg sm:rounded-t-none">
                <img
                  src={book.ImageURL || "https://images.app.goo.gl/pyesa9xcnXgac95B9"}
                  alt={book.title}
                  className="w-32 h-48 object-cover rounded-lg shadow-md"
                />
              </div>
              {/* Right side with book details */}
              <div className="p-4 flex flex-col justify-between">
                <h3 className="text-xl font-bold text-sky-800 mb-2">{book.title}</h3>
                <p className="text-lg text-gray-700 mb-1">Author: {book.author}</p>
                <p className="text-lg text-gray-700 mb-3">Year: {book.publishYear}</p>
                <div className="flex gap-x-4 mt-auto">
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className="text-2xl text-green-800" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDeleteSweep className="text-2xl text-red-600" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {currentIndex + 4 < books.length && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <IoIosArrowForward
              onClick={() => handleNext(setCurrentIndex, currentIndex, books.length)}
              className="text-4xl text-gray-600 cursor-pointer hover:text-gray-800 transition duration-200"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-x-2">
          <FaBook className="text-sky-800 text-5xl" />
          <h1 className="text-5xl font-extrabold text-sky-800">
            Book<span className="text-amber-600">Bliss</span>
          </h1>
        </div>
        <div className="relative w-1/2">
          <AiOutlineSearch className="absolute top-3 left-3 text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={searchQuery}
            onChange={handleSearch}
            className="border rounded-md pl-10 pr-4 py-2 w-full text-lg"
          />
        </div>
        <div>
          <Button
            aria-controls="account-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
            className="text-lg text-blue-600 hover:text-blue-800"
          >
            My Account
          </Button>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {isAuthenticated ? (
              <MenuItem onClick={handleSignout}>Signout</MenuItem>
            ) : (
              <>
                <MenuItem component={Link} to="/login">
                  Login
                </MenuItem>
                <MenuItem component={Link} to="/signup">
                  Signup
                </MenuItem>
              </>
            )}
          </Menu>
        </div>
      </div>

      {/* Add Book Button */}
      <div className="p-3 bg-white shadow-lg rounded-lg w-60 max-w-xs ml-auto">
  <div className="flex justify-end items-center">
    <h2 className="text-xl font-semibold">Create New Book</h2>
    <Link to="/books/create" className="ml-2">
      <MdOutlineAddBox className="text-sky-800 text-3xl" />
    </Link>
  </div>
</div><br></br>

      {/* Render book rows */}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {renderBooks(fictionBooks, currentIndexFiction, setCurrentIndexFiction, "Adventure Fiction")}
          {renderBooks(educationBooks, currentIndexEducation, setCurrentIndexEducation, "Fantasy")}
        </>
      )}
      <br />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Admin;
