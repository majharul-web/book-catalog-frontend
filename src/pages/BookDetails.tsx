import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteBookMutation, useSingleBookQuery } from "../redux/features/book/bookApi";
import { FaHeart, FaStar } from "react-icons/fa";
import { BiSolidPencil, BiSolidBookReader } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import FeedbackForm from "../components/FeedbackForm";
import { toast } from "react-hot-toast";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useSingleBookQuery(id);
  const book = data?.data;

  const [deleteBook, { data: deletedData, isLoading: deleteLoading, error: deleteError, isSuccess }] =
    useDeleteBookMutation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    deleteBook(id);
  };

  useEffect(() => {
    if (!deleteLoading && !deleteError && isSuccess && deletedData.statusCode === 200) {
      toast.success("Book deleted successful");
      navigate("/all-books");
    } else if (!deleteLoading && deleteError) {
      toast.error("Something went wrong!");
    }
  }, [deletedData, isSuccess, deleteLoading, deleteError, navigate]);

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
              <div className=''>
                <button onClick={handleShow} className='btn btn-primary-outline my-1 mx-1'>
                  Wishlist{" "}
                  <span className='ms-1'>
                    <FaHeart />
                  </span>
                </button>
                <button onClick={handleShow} className='btn btn-primary-outline my-1 mx-1'>
                  Reading list{" "}
                  <span className='ms-1'>
                    <BiSolidBookReader />
                  </span>
                </button>
                <Link
                  to={`/edit-book/${id}`}
                  onClick={handleShow}
                  className='btn btn-primary-outline my-1 mx-1'
                >
                  Edit{" "}
                  <span className='ms-1'>
                    <BiSolidPencil />
                  </span>
                </Link>
                <button onClick={() => handleDelete()} className='btn btn-primary-outline my-1 mx-1'>
                  Delete{" "}
                  <span className='ms-1'>
                    <MdDeleteForever />
                  </span>
                </button>
              </div>
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

                <button onClick={handleShow} className='btn btn-primary-outline'>
                  Add Feedback
                </button>
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
    </>
  );
};

export default BookDetails;
