import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/globalTypes";

const Home = () => {
  const { data, isLoading, error } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 3000,
  });
  const allBooks = data?.data;

  let content;
  if (isLoading) {
    content = (
      <div className='flex flexCenter aCenter'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }
  if (!isLoading && error) {
    content = (
      <div className='flex flexCenter aCenter'>
        <h5 className='text-center'>Something went wrong</h5>
      </div>
    );
  }
  if (!isLoading && !error && data.data.length === 0) {
    content = (
      <div className='flex flexCenter aCenter'>
        <h5 className='text-center'>No books available</h5>
      </div>
    );
  }

  if (!isLoading && !error && data.data.length > 0) {
    content = (
      <div className='row row-cols-1 row-cols-md-4'>
        {allBooks.map((book: IBook, index: any) => (
          <BookCard book={book} key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className='section-space'>
      <div className='container'>
        <h5 className='section-title'>Books</h5>
        {content}
      </div>
    </div>
  );
};

export default Home;
