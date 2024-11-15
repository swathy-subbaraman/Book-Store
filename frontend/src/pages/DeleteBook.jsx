import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner"; // Ensure the correct path and capitalization for Spinner
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully.", { variant: "success" });
        navigate("/Admin"); // Redirect to home or book list
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred while deleting the book.", { variant: "error" });
        console.error("Error deleting book:", error); // More informative error logging
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      
      {loading ? (
        <Spinner /> // Show spinner during loading
      ) : (
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
          <button
            className="p-4 bg-red-600 text-white mt-4 rounded hover:bg-red-700 disabled:bg-red-300"
            onClick={handleDeleteBook}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
