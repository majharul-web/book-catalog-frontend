import notfound from "../assets/images/no-data.gif";

const NoDatafound = () => {
  return (
    <div className='text-center'>
      <img className='img-fluid' src={notfound} alt='' />
    </div>
  );
};

export default NoDatafound;
