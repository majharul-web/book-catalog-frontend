import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import { BiSolidPencil, BiSolidBookReader } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import FeedbackForm from "../components/FeedbackForm";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../redux/hooks";
import { isBookCreatedBySame } from "../utils/helper";
import DeleteBook from "../components/DeleteBook";
import { useSingleBookQuery } from "../redux/features/book/bookApi";
import { useAddToWishListMutation } from "../redux/features/wishlist/wishListApi";
import { useAddToReadingListMutation } from "../redux/features/readingList/readingListApi";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading, error } = useSingleBookQuery(id);
  const book = data?.data;

  // wish and read
  const [
    addToWishlist,
    { data: wishData, isLoading: wishLoading, error: wishError, isSuccess: wishSuccess },
  ] = useAddToWishListMutation();

  const [
    addToReadingList,
    { data: readingData, isLoading: readingLoading, error: readingError, isSuccess: readingSuccess },
  ] = useAddToReadingListMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deleteshow, setDeleteShow] = useState(false);

  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);

  const handleEdit = () => {
    if (isBookCreatedBySame(user!._id, book.createdBy._id)) {
      navigate(`/edit-book/${id}`);
    } else {
      toast.error("You can't edit this book");
    }
  };

  const handleAddToWishList = () => {
    addToWishlist({
      bookId: book._id,
      userId: user!._id,
    });
  };

  const handleAddToReadingList = () => {
    addToReadingList({
      bookId: book._id,
      userId: user!._id,
    });
  };

  useEffect(() => {
    if (!wishLoading && !wishError && wishSuccess && wishData.statusCode === 200) {
      toast.success("Book add to wishlist successfully");
    } else if (!wishLoading && wishError) {
      toast.error("Something went wrong!");
    }
  }, [wishData, wishSuccess, wishLoading, wishError]);

  useEffect(() => {
    if (!readingLoading && !readingError && readingSuccess && readingData.statusCode === 200) {
      toast.success("Book add to readinglist successfully");
    } else if (!readingLoading && readingError) {
      toast.error("Something went wrong!");
    }
  }, [readingData, readingSuccess, readingLoading, readingError]);

  let content;
  if (isLoading) {
    content = (
      <div className='flex flexCenter aCenter'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }
  if (!isLoading && error) {
    content = (
      <div className='flex flexCenter aCenter'>
        <h5 className='text-center'>Something went wrong</h5>
      </div>
    );
  }

  if (!isLoading && !error && book) {
    content = (
      <div className='card mb-3'>
        <div className='row g-0'>
          <div className='col-md-4'>
            <img src={book?.image} className='img-fluid rounded-start' alt='...' />
          </div>
          <div className='col-md-8'>
            <div className='card-body'>
              <h5 className='card-title text-primary'>Title:{book.title}</h5>
              <p>
                <span className='bold'>Author:</span> {book?.author}
              </p>
              <p>
                <span className='bold'>Genre:</span>
                {book?.genre}
              </p>
              <p>
                <span className='bold'>Publication Date:</span>

                {new Date(book?.publicationDate).toISOString().split("T")[0]}
              </p>
              <p className='card-text'>
                <span className='bold'>description:</span>
                {book?.description?.slice(0, 100)}
              </p>
              {user?.email && (
                <div>
                  <button onClick={() => handleAddToWishList()} className='btn btn-primary-outline my-1 mx-1'>
                    Wishlist{" "}
                    <span className='ms-1'>
                      <FaHeart />
                    </span>
                  </button>
                  <button
                    onClick={() => handleAddToReadingList()}
                    className='btn btn-primary-outline my-1 mx-1'
                  >
                    Reading list{" "}
                    <span className='ms-1'>
                      <BiSolidBookReader />
                    </span>
                  </button>
                  <button onClick={() => handleEdit()} className='btn btn-primary-outline my-1 mx-1'>
                    Edit
                    <span className='ms-1'>
                      <BiSolidPencil />
                    </span>
                  </button>
                  <button onClick={handleDeleteShow} className='btn btn-primary-outline my-1 mx-1'>
                    Delete{" "}
                    <span className='ms-1'>
                      <MdDeleteForever />
                    </span>
                  </button>
                </div>
              )}
              <hr />
              <div>
                {book.reviews && (
                  <div className='feedback'>
                    <p className='bold'>Review({book?.reviews.length}):</p>
                    {book.reviews
                      .slice(0, 3)
                      .map((review: { rating: number; comment: string }, index: string) => (
                        <div key={index}>
                          {Array.from({ length: review.rating }, (_, i) => (
                            <span key={i} className='rating'>
                              <FaStar />
                            </span>
                          ))}
                          ( {review.rating})
                          <p>
                            "<i>{review.comment}</i>"
                          </p>
                        </div>
                      ))}
                  </div>
                )}

                {user?.email && (
                  <button onClick={handleShow} className='btn btn-primary-outline'>
                    Add Feedback
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className='section-space'>
        <div className='container'>{content}</div>
      </div>
      {show && <FeedbackForm show={show} handleClose={handleClose} id={id!} />}
      {deleteshow && <DeleteBook show={deleteshow} handleClose={handleDeleteClose} id={id!} book={book} />}
    </>
  );
};

export default BookDetails;
