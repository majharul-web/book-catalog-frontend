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
            <img style={{ width: "100%" }} src={book?.image} alt='' />
          </div>
        )}
        <div className='mt-3 card-body book-card'>
          <h3 className='text-primary title'>Title:{book.title}</h3>
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
            <button className='btn btn-primary-outline'>see details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
