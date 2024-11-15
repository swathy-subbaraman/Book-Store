import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import signup from "../components/signup";
import { AiOutlineSearch } from "react-icons/ai";
import { FaBook } from "react-icons/fa";
import { Menu, MenuItem, Button } from "@mui/material";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineAddBox, MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa"; // Import cart icon

const UserUI = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState(""); // State to store the logged-in user's name
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentIndexFiction, setCurrentIndexFiction] = useState(0);
  const [currentIndexEducation, setCurrentIndexEducation] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [cartCount, setCartCount] = useState(0); // Cart count state
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
        console.error(error);
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
    // Clear user-related states
    setIsAuthenticated(false);
    setUserName(""); // Clear the username
    handleMenuClose();
    navigate("/"); // Redirect to home page
  };
  

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };
  

  const [showFavoriteMessage, setShowFavoriteMessage] = useState(false);

  const handleFavorite = (bookId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = new Set(prevFavorites);
      if (updatedFavorites.has(bookId)) {
        updatedFavorites.delete(bookId);
      } else {
        updatedFavorites.add(bookId);
        // Show the pop-up message when a book is added to favorites
        setShowFavoriteMessage(true);
        setTimeout(() => {
          setShowFavoriteMessage(false);
        }, 2000); // Message will disappear after 2 seconds
      }
      return updatedFavorites;
    });
  };

  const handleAddToCart = (book) => {
    // Add the selected book to the cart in localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.push(book);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  
    // Increment the cart count
    setCartCount(cartCount + 1);
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
    <div className="mb-8"><br></br>
      <h2 className="text-3xl font-bold text-amber-600">{genre}</h2><br></br>
      <div className="relative">
        {/* Left Arrow */}
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
              <div className="p-4 bg-gray-100 flex justify-center items-center rounded-t-lg sm:rounded-l-lg sm:rounded-t-none">
                <img
                  src={book.ImageURL || "https://images.app.goo.gl/pyesa9xcnXgac95B9"}
                  alt={book.title}
                  className="w-32 h-48 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <h3 className="text-xl font-bold text-sky-800 mb-2">{book.title}</h3>
                <p className="text-lg text-gray-700 mb-1">by {book.author}</p>
                <p className="text-base text-gray-500 mb-1"><i>Published in {book.publishYear}</i></p>
                <div className="flex items-center mb-3">
                  <p className="text-xl font-bold text-green-600">₹{book.cost}</p>
                  {book.Offer && (
                    <p className="ml-4 text-md font-semibold bg-red-100 text-red-500 px-2 py-1 rounded-md shadow-sm">
                      {book.Offer}% Off
                    </p>
                  )}
                </div>
                <div className="flex gap-x-4 mt-auto items-center">
                  <Button
                    variant="contained"
                    color="primary"
                    className="text-xs px-2 py-1"
                    style={{ fontSize: "0.70rem" }}
                    onClick={() => handleAddToCart(book._id)} // Call add to cart handler
                  >
                    Add to Cart
                  </Button>
                  {favorites.has(book._id) ? (
                    <MdFavorite
                      onClick={() => handleFavorite(book._id)}
                      className="text-2xl text-red-500 cursor-pointer hover:text-red-600 transition duration-200"
                    />
                  ) : (
                    <MdFavoriteBorder
                      onClick={() => handleFavorite(book._id)}
                      className="text-2xl text-gray-500 cursor-pointer hover:text-red-500 transition duration-200"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Right Arrow */}
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
      {/* Pop-up message for added to favorites */}
      {showFavoriteMessage && (
        <div className="fixed bottom-4 left-4 bg-black text-white px-4 py-2 rounded-md shadow-lg z-50">
          Added to favorites!
        </div>
      )}
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
          <div className="flex items-center gap-x-2">
  <Button
    aria-controls="account-menu"
    aria-haspopup="true"
    onClick={handleMenuClick}
    className="text-lg text-blue-600 hover:text-blue-800"
  >
    {userName ? `Welcome ${userName}` : "My Account"}
  </Button>
  <Menu
    id="account-menu"
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleMenuClose}
  >
    <MenuItem
      onClick={() => {
        handleSignout();
      }}
    >
      Signout
    </MenuItem>
  </Menu>
</div>


        </div>
          {/* Cart Icon */}
<div className="relative">
  <Link to="/cart">
    <FaShoppingCart className="text-3xl text-gray-600 cursor-pointer" />
    {cartCount > 0 && (
      <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
        {cartCount}
      </div>
    )}
  </Link>
</div>

        </div>
        

        {/* Render Fiction and Education Books */}
        {renderBooks(fictionBooks, currentIndexFiction, setCurrentIndexFiction, " Adventure Fiction")}
        {renderBooks(educationBooks, currentIndexEducation, setCurrentIndexEducation, "Fantasy")}
      </div>
      <Footer />
    </div>
  );
};

export default UserUI;
