import NoDatafound from "../components/NoDatafound";
import WishBook from "../components/WishBook";
import { useGetWishListQuery } from "../redux/features/wishlist/wishListApi";
import { useAppSelector } from "../redux/hooks";

const WishList = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading, error } = useGetWishListQuery(user!._id, {
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
          <WishBook books={book} key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className='section-space'>
      <div className='container'>
        <h3>WishList</h3>
        {content}
      </div>
    </div>
  );
};

export default WishList;
