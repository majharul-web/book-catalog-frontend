import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "../redux/features/user/userApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface SignUpFormValues {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  description: string;
  image: string;
}

const AddBookForm: React.FC = () => {
  const [signup, { data, isLoading, isSuccess, error }] = useSignupMutation();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormValues>();

  const onSubmit = (data: SignUpFormValues) => {
    console.log("data", data);
  };

  useEffect(() => {
    if (!isLoading && !error && isSuccess && data.statusCode === 200) {
      toast.success("Book added successful");
      reset();
      navigate("/all-books");
    } else if (!isLoading && error) {
      toast.error("Something went wrong!");
    }
  }, [data, isSuccess, isLoading, error, navigate, reset]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId='title' className='my-1'>
        <Form.Label>
          Title <span className='text-danger'>*</span>
        </Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter your title'
          {...register("title", { required: "title is required" })}
        />
        {errors.title && <Form.Text className='text-danger d-inline'>{errors.title.message}</Form.Text>}
      </Form.Group>

      <Form.Group controlId='author' className='my-1'>
        <Form.Label>
          Author <span className='text-danger'>*</span>
        </Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter your author'
          {...register("author", { required: "author is required" })}
        />
        {errors.author && <Form.Text className='text-danger d-inline'>{errors.author.message}</Form.Text>}
      </Form.Group>
      <Form.Group controlId='genre' className='my-1'>
        <Form.Label>
          Genre <span className='text-danger'>*</span>
        </Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter your genre'
          {...register("genre", { required: "genre is required" })}
        />
        {errors.genre && <Form.Text className='text-danger d-inline'>{errors.genre.message}</Form.Text>}
      </Form.Group>
      <Form.Group controlId='publicationDate' className='my-1'>
        <Form.Label>
          Publication Date <span className='text-danger'>*</span>
        </Form.Label>
        <Form.Control
          type='date'
          placeholder='Enter your publicationDate'
          {...register("publicationDate", { required: "publication date is required" })}
        />
        {errors.publicationDate && (
          <Form.Text className='text-danger d-inline'>{errors.publicationDate.message}</Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId='image' className='my-1'>
        <Form.Label>Image link</Form.Label>
        <Form.Control type='text' placeholder='Enter your image link' {...register("image")} />
      </Form.Group>
      <Form.Group controlId='description' className='my-1'>
        <Form.Label>Description</Form.Label>
        <Form.Control type='text' placeholder='Enter your description' {...register("description")} />
      </Form.Group>
      <div className='my-3'>
        <Button className={`btn btn-primary-outline btn-block w-100`} type='submit'>
          Add Book{" "}
          {isLoading && (
            <div className='spinner-border text-danger mx-2' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          )}
        </Button>
      </div>
    </Form>
  );
};

export default AddBookForm;
