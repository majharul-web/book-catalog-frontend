import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data); // You can replace this with your login logic
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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

      <div className='my-3'>
        <Button className='btn btn-primary-outline btn-block w-100' type='submit'>
          Log In
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
