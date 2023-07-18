import { Card } from "react-bootstrap";

import EditBookForm from "../components/EditBookForm";
import { useParams } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
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
                  Edit Book{" "}
                </h2>
                <EditBookForm id={id!} />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
