import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  useDeleteFromReadingListMutation,
  useEditReadingListMutation,
} from "../redux/features/readingList/readingListApi";

interface IProps {
  books: any;
}
const ReadBook = ({ books }: IProps) => {
  const book = books.book;

  const [deleteBook, { data: deletedData, isLoading: deleteLoading, error: deleteError, isSuccess }] =
    useDeleteFromReadingListMutation();

  const handleDelete = () => {
    deleteBook(books!._id);
  };

  useEffect(() => {
    if (!deleteLoading && !deleteError && isSuccess && deletedData.statusCode === 200) {
      toast.success("Book deleted from reading successful");
    } else if (!deleteLoading && deleteError) {
      toast.error("Something went wrong!");
    }
  }, [deletedData, isSuccess, deleteLoading, deleteError]);

  const [
    updateStatus,
    { data: statusData, isLoading: statusLoading, error: statusError, isSuccess: statusSuccess },
  ] = useEditReadingListMutation();

  const handleStatusChange = (e: any) => {
    updateStatus({ id: books._id, data: { status: e.target.value } });
  };

  useEffect(() => {
    if (!statusLoading && !statusError && statusSuccess && statusData.statusCode === 200) {
      toast.success("Book status updated successful");
    } else if (!statusLoading && statusError) {
      toast.error("Something went wrong!");
    }
  }, [statusData, statusSuccess, statusLoading, statusError]);

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
          <p>
            <span className='bold'>Status:</span>
            <select
              onChange={handleStatusChange}
              className='form-select ms-1'
              aria-label='Default select example'
            >
              <option selected={books.status === "plan to read soon"} value='plan to read soon'>
                plan to read soon
              </option>
              <option selected={books.status === "currently reading"} value='currently reading'>
                currently reading
              </option>
              <option selected={books.status === "finished reading"} value='finished reading'>
                finished reading
              </option>
            </select>
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

export default ReadBook;
