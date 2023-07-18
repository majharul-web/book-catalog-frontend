import { Link } from "react-router-dom";
import { IBook } from "../types/globalTypes";
interface IProps {
  book: IBook;
}

const BookCard = ({ book }: IProps) => {
  return (
    <div className='col h-100'>
      <div className='card'>
        {book.image && (
          <div className='card-image'>
            <Link to={`/book-details/${book._id}`}>
              <img style={{ width: "100%", maxHeight: "200px" }} src={book?.image} alt='' />
            </Link>
          </div>
        )}
        <div className='mt-3 card-body book-card'>
          <h6 className='text-primary title'>Title:{book.title}</h6>
          <p>
            <span className='bold'>Author:</span> {book?.author}
          </p>
          <p>
            <span className='bold'>Genre:</span>
            {book?.genre}
          </p>
          <p>
            <span className='bold'>description:</span>
            {book?.description?.slice(0, 100)}
          </p>

          <hr />
          <div className='flexCenter aCenter'>
            <Link to={`/book-details/${book._id}`}>
              <button className='btn btn-primary-outline'>see details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
