import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Modal Component
const Modal = ({ show, onClose, deliveryDate, totalAmount }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <div className="flex flex-col items-center">
          <div className="text-green-500 text-4xl mb-3">✅</div>
          <h2 className="text-xl font-bold mb-2">Successful</h2>
          <p className="text-gray-600 mb-4">Your order will be delivered on:</p>
          <p className="text-lg font-semibold text-gray-800 mb-4">{deliveryDate}</p>
          <p className="text-gray-600 mb-4">Mode: Cash on Delivery</p>
          <p className="text-lg font-bold text-green-600">Total Amount: ₹{totalAmount.toFixed(2)}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5555/books');
        const allBooks = response.data.data;

        const booksWithDetails = cart.map((bookId) => {
          return allBooks.find((book) => book._id === bookId);
        }).filter(Boolean);

        const booksWithQuantities = booksWithDetails.map((book) => ({
          ...book,
          quantity: 1,
        }));

        setCartItems(booksWithQuantities);
        calculateTotalAmount(booksWithQuantities);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBooks();
  }, []);

  const calculateTotalAmount = (books) => {
    const total = books.reduce((acc, book) => {
      const offerDiscount = book.Offer ? (book.cost * book.Offer) / 100 : 0;
      const finalPrice = (book.cost - offerDiscount) * book.quantity;
      return acc + finalPrice;
    }, 0);
    setTotalAmount(total);
  };

  const handleRemoveItem = (bookId) => {
    const updatedCart = cartItems.filter((item) => item._id !== bookId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart.map((item) => item._id)));
    calculateTotalAmount(updatedCart);
  };

  const handleQuantityChange = (bookId, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === bookId) {
        const updatedQuantity = item.quantity + delta;
        return { ...item, quantity: Math.max(1, updatedQuantity) };
      }
      return item;
    });
    setCartItems(updatedCart);
    calculateTotalAmount(updatedCart);
  };

  const handleCheckout = () => {
    if (window.confirm('Are you sure you want to check out?')) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 2);
      setDeliveryDate(currentDate.toDateString());
      setShowModal(true);

      
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
    // Clear cart and reset total amount after modal is closed.
    setCartItems([]);
    localStorage.removeItem('cart');
    setTotalAmount(0);
  };
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-amber-600 mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {cartItems.map((book) => (
              <div key={book._id} className="border rounded-lg shadow-lg bg-white flex flex-col">
                <div className="p-4 bg-gray-100 flex justify-center items-center rounded-t-lg">
                  <img
                    src={book.ImageURL || 'https://i.redd.it/lffwb6j2cmxd1.jpeg'}
                    alt={book.title}
                    className="w-32 h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <h3 className="text-xl font-bold text-sky-800 mb-2">{book.title}</h3>
                  <p className="text-md text-gray-700 mb-1">by {book.author}</p>
                  <p className="text-sm text-gray-500 mb-1"><i>Published in {book.publishYear}</i></p>
                  <div className="flex items-center mb-3">
                    <p className="text-lg font-bold text-green-600">₹{book.cost}</p>
                    {book.Offer && (
                      <p className="ml-4 text-sm font-semibold bg-red-100 text-red-500 px-2 py-1 rounded-md shadow-sm">
                        {book.Offer}% Off
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between mt-2 items-center">
                    <div className="flex items-center">
                      <button
                        className="text-xs text-gray-500 px-2 border rounded-l-lg hover:bg-gray-200"
                        onClick={() => handleQuantityChange(book._id, -1)}
                      >
                        -
                      </button>
                      <span className="px-2 text-sm font-semibold">{book.quantity}</span>
                      <button
                        className="text-xs text-gray-500 px-2 border rounded-r-lg hover:bg-gray-200"
                        onClick={() => handleQuantityChange(book._id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-xs text-red-500 font-semibold hover:text-red-700 transition duration-200"
                      onClick={() => handleRemoveItem(book._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Total Amount:</h2>
            <p className="text-2xl font-bold text-green-600">₹{totalAmount.toFixed(2)}</p>
          </div>

          <button
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200"
            onClick={handleCheckout}
          >
            Check Out
          </button>
        </>
      )}

      <Modal
        show={showModal}
        onClose={handleModalClose}
        deliveryDate={deliveryDate}
        totalAmount={totalAmount}
      />
    </div>
  );
};

export default CartPage;
