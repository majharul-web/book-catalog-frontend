import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { isBookCreatedBySame } from "../utils/helper";
import { useDeleteBookMutation } from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hooks";

interface FeedbackFormProps {
  id: string;
  book: any;
  show: boolean;
  handleClose: () => void;
}

const DeleteBook: React.FC<FeedbackFormProps> = ({ show, handleClose, id, book }) => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [deleteBook, { data: deletedData, isLoading: deleteLoading, error: deleteError, isSuccess }] =
    useDeleteBookMutation();

  const handleDelete = () => {
    if (isBookCreatedBySame(user!._id, book.createdBy._id)) {
      deleteBook(id);
    } else {
      handleClose();
      toast.error("You can't delete this book");
    }
  };

  useEffect(() => {
    if (!deleteLoading && !deleteError && isSuccess && deletedData.statusCode === 200) {
      toast.success("Book deleted successful");
      navigate("/all-books");
    } else if (!deleteLoading && deleteError) {
      toast.error("Something went wrong!");
    }
  }, [deletedData, isSuccess, deleteLoading, deleteError, navigate]);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className='text-danger'>Are you want to delete this book?</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={() => handleDelete()}>
            Delete
            {deleteLoading && (
              <div className='spinner-border text-danger mx-2' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteBook;
