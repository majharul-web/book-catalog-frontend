import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAddCommentMutation } from "../redux/features/book/bookApi";

interface FeedbackFormProps {
  id: string;
  show: boolean;
  handleClose: () => void;
}

interface LoginFormValues {
  rating: number;
  comment: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ show, handleClose, id }) => {
  const [pstFeedback, { data, isLoading, isSuccess, error }] = useAddCommentMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    pstFeedback({ data: { rating: data.rating, comment: data.comment }, id });
  };

  useEffect(() => {
    if (!isLoading && !error && isSuccess && data.statusCode === 200) {
      toast.success("User feedback submission successfully");
      reset();
      handleClose();
    } else if (!isLoading && error) {
      toast.error("User feedback submission failed!");
    }
  }, [data, isSuccess, isLoading, error, navigate, reset, handleClose]);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId='rating'>
              <Form.Label>
                rating <span className='text-danger'>*</span>
              </Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter rating'
                {...register("rating", {
                  required: "rating is required",
                })}
              />
              {errors.rating && (
                <Form.Text className='text-danger d-inline'>{errors.rating.message}</Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId='comment'>
              <Form.Label>
                comment <span className='text-danger'>*</span>
              </Form.Label>
              <Form.Control
                type='comment'
                placeholder='Enter comment'
                {...register("comment", {
                  required: "comment is required",
                })}
              />
              {errors.comment && (
                <Form.Text className='text-danger d-inline'>{errors.comment.message}</Form.Text>
              )}
            </Form.Group>

            <div className='my-3'>
              <Button className='btn btn-primary-outline btn-block w-100' type='submit'>
                Submit
                {isLoading && (
                  <div className='spinner-border text-danger mx-2' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                  </div>
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FeedbackForm;
