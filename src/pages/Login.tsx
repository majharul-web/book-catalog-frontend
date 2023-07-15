import { Card } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import loginImg from "../assets/images/login.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className='container flexCenter aCenter' style={{ minHeight: "100vh" }}>
      <div className='row aCenter'>
        <div className='col-md-6'>
          <img className='img-fluid' src={loginImg} alt='' />
        </div>
        <div className='col-md-6'>
          <Card className='p-md-4'>
            <Card.Body>
              <h2 className='text-center' style={{ color: "#007dfe" }}>
                Login
              </h2>
              <LoginForm />
              <div className='text-end'>
                <Link to='/signup'>Don't have an account</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
