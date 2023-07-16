import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../redux/features/user/userApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { userLoggedIn } from "../redux/features/user/userSlice";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [login, { data, isLoading, isSuccess, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    login({ email: data.email, password: data.password });
  };

  useEffect(() => {
    if (!isLoading && !error && isSuccess && data.statusCode === 200) {
      const { _id, email } = data.data.user;
      localStorage.setItem(
        "user",
        JSON.stringify({
          accessToken: data.data.accessToken,
          user: { _id, email },
        })
      );

      dispatch(
        userLoggedIn({
          accessToken: data.data.accessToken,
          user: { _id, email },
        })
      );
      toast.success("User logged in successfully");
      reset();
      navigate("/");
    } else if (!isLoading && error) {
      toast.error("User login failed!");
    }
  }, [data, isSuccess, isLoading, error, navigate, reset, dispatch]);

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

export default LoginForm;
