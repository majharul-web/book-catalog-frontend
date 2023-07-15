import { Card } from "react-bootstrap";
import SignUpForm from "../components/SignUpForm";
import signupImg from "../assets/images/signup.jpg";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className='container flexCenter aCenter' style={{ minHeight: "100vh" }}>
      <div className='row aCenter'>
        <div className='col-md-6'>
          <img className='img-fluid' src={signupImg} alt='' />
        </div>
        <div className='col-md-6'>
          <Card className='p-md-4'>
            <Card.Body>
              <h2 className='text-center f' style={{ color: "#01b399" }}>
                SignUp
              </h2>
              <SignUpForm />
              <div className='text-end'>
                <Link to='/login'>Already have an account</Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
