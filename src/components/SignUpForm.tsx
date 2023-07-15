import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";

interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string; // New field
}

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormValues>();

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    console.log(data); // You can replace this with your sign-up logic
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId='name'>
        <Form.Label>
          Name <span className='text-danger'>*</span>
        </Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter your name'
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <Form.Text className='text-danger d-inline'>{errors.name.message}</Form.Text>}
      </Form.Group>

      <Form.Group controlId='email'>
        <Form.Label>
          Email <span className='text-danger'>*</span>
        </Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <Form.Text className='text-danger d-inline'>{errors.email.message}</Form.Text>}
      </Form.Group>

      <Form.Group controlId='address'>
        <Form.Label>
          Address <span className='text-danger'>*</span>
        </Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter address'
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && <Form.Text className='text-danger d-inline'>{errors.address.message}</Form.Text>}
      </Form.Group>

      <Form.Group controlId='password'>
        <Form.Label>
          Password <span className='text-danger'>*</span>
        </Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter password'
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        {errors.password && <Form.Text className='text-danger d-inline'>{errors.password.message}</Form.Text>}
      </Form.Group>

      <Form.Group controlId='confirmPassword'>
        <Form.Label>
          Confirm Password <span className='text-danger'>*</span>
        </Form.Label>
        <Form.Control
          type='password'
          placeholder='Confirm password'
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <Form.Text className='text-danger d-inline'>{errors.confirmPassword.message}</Form.Text>
        )}
      </Form.Group>

      <div className='my-3'>
        <Button className='btn btn-primary-outline btn-block w-100' type='submit'>
          Sign Up
        </Button>
      </div>
    </Form>
  );
};

export default SignUpForm;
