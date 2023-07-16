import { Card } from "react-bootstrap";
import AddBookForm from "../components/AddBookForm";
import signupImg from "../assets/images/signup.jpg";
import { Link } from "react-router-dom";

const AddNewBook = () => {
  return (
    <div className='section-space'>
      <div className='container'>
        <div className='row aCenter'>
          <div className='col-md-6'>
            <img className='img-fluid' src='https://i.ibb.co/BGqzR66/book.png' alt='book' />
          </div>
          <div className='col-md-6'>
            <Card className='p-md-4'>
              <Card.Body>
                <h2 className='text-center f' style={{ color: "#01b399" }}>
                  Add New Book{" "}
                </h2>
                <AddBookForm />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewBook;
