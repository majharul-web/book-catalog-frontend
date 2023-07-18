import NoDatafound from "../components/NoDatafound";
import ReadBook from "../components/ReadBook";

import { useGetReadingListQuery } from "../redux/features/readingList/readingListApi";
import { useAppSelector } from "../redux/hooks";

const ReadingLists = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading, error } = useGetReadingListQuery(user!._id, {
    refetchOnMountOrArgChange: true,
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
    content = <NoDatafound />;
  }

  if (!isLoading && !error && data.data.length > 0) {
    content = (
      <div className='row row-cols-1 row-cols-md-4'>
        {allBooks.map((book: any, index: any) => (
          <ReadBook books={book} key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className='section-space'>
      <div className='container'>
        <h3>ReadingLists</h3>
        {content}
      </div>
    </div>
  );
};

export default ReadingLists;
