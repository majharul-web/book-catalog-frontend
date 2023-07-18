import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useDeleteFromWishListMutation } from "../redux/features/wishlist/wishListApi";

interface IProps {
  books: any;
}
const WishBook = ({ books }: IProps) => {
  const book = books.book;

  const [deleteBook, { data: deletedData, isLoading: deleteLoading, error: deleteError, isSuccess }] =
    useDeleteFromWishListMutation();

  const handleDelete = () => {
    deleteBook(books!._id);
  };

  useEffect(() => {
    if (!deleteLoading && !deleteError && isSuccess && deletedData.statusCode === 200) {
      toast.success("Book deleted from wishlist successful");
    } else if (!deleteLoading && deleteError) {
      toast.error("Something went wrong!");
    }
  }, [deletedData, isSuccess, deleteLoading, deleteError]);

  return (
    <div className='col h-100'>
      <div className='card'>
        {book.image && (
          <div className='card-image'>
            <Link to={`/book-details/${book._id}`}>
              <img style={{ width: "100%", maxHeight: "200px" }} src={book?.image} alt='' />
            </Link>
          </div>
        )}
        <div className='mt-3 card-body book-card'>
          <h6 className='text-primary title'>Title:{book.title}</h6>
          <p>
            <span className='bold'>Author:</span> {book?.author}
          </p>
          <p>
            <span className='bold'>Genre:</span>
            {book?.genre}
          </p>
          <p>
            <span className='bold'>description:</span>
            {book?.description?.slice(0, 100)}
          </p>

          <hr />
          <div className='flexCenter aCenter'>
            <Link to={`/book-details/${book._id}`} className='mx-1'>
              <button className='btn btn-primary-outline'>see details</button>
            </Link>

            <button className='btn btn-primary-outline mx-2' onClick={() => handleDelete()}>
              <span className='me-1'>remove</span>
              {deleteLoading ? (
                <div className='spinner-border text-danger mx-2' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
              ) : (
                <FaHeart />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishBook;
