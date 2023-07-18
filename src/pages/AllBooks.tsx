import { useState, useMemo } from "react";
import BookCard from "../components/BookCard";
import NoDatafound from "../components/NoDatafound";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/globalTypes";

const AllBooks = () => {
  const [search, setSearchTerm] = useState("");

  const { data, isLoading, error } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const allBooks = data?.data;

  const debounceHandler = (fn: any, delay: number) => {
    let timeoutId: any;
    return (...args: []) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const doSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = debounceHandler(doSearch, 500);

  // search user by email or name
  const allUsersData = useMemo(() => {
    let computedUsers = allBooks;
    if (search) {
      computedUsers = computedUsers.filter(
        (book: IBook) =>
          book?.title.toLowerCase().includes(search.toLowerCase()) ||
          book?.author?.toLowerCase().includes(search.toLowerCase()) ||
          book?.genre?.toLowerCase().includes(search.toLowerCase())
      );
    }
    return computedUsers;
  }, [search, allBooks]);

  // console.log(searchTerm);

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
        {allUsersData.map((book: IBook, index: any) => (
          <BookCard book={book} key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className='section-space'>
      <div className='container'>
        <h5 className='section-title'> All Books</h5>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mb-3'>
              <input
                type='text'
                className='form-control'
                placeholder='search with title, author, or genre...'
                onChange={handleSearch}
              />
            </div>
          </div>
          {/* <div className='col-md-6 text-end'>
            <div>
              <label className='form-label bold me-2'>Filter:</label>
              <select className='form-select ms-1' aria-label='Default select example'>
                <option value='plan to read soon'>plan to read soon</option>
                <option value='currently reading'>currently reading</option>
                <option value='finished reading'>finished reading</option>
              </select>
            </div>
          </div> */}
        </div>
        {content}
      </div>
    </div>
  );
};

export default AllBooks;
