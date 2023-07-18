import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { userLoggedOut } from "../redux/features/user/userSlice";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { RxAvatar } from "react-icons/rx";
import { FaHeart } from "react-icons/fa";
import { BiSolidBookReader } from "react-icons/bi";

const Appbar = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Navbar key='xl' expand='xl' className='bg-body-tertiary header'>
      <Container>
        <Navbar.Brand href='/' className='text-primary bold f-roboto'>
          BOOKSELF
        </Navbar.Brand>
        <Navbar.Toggle className='custom-toggler' aria-controls={`offcanvasNavbar-expand-xl`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-xl`}
          aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
          placement='end'
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className='text-primary bold f-roboto' id={`offcanvasNavbarLabel-expand-xl`}>
              BOOKSELF
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-start flex-grow-1 pe-3'>
              <Link to='all-books' className='nav-link mx-2'>
                All Books
              </Link>
            </Nav>
            <div className='off-form'>
              {auth.accessToken && (
                <>
                  <Link to='wishlist' className='nav-link mx-2'>
                    <FaHeart />
                  </Link>
                  <Link to='reading-list' className='nav-link mx-2'>
                    <BiSolidBookReader />
                  </Link>
                </>
              )}

              {auth.accessToken && (
                <Link to='add-books' className='nav-link mx-2'>
                  Add Books
                </Link>
              )}
              <div className='nav-btns'>
                {auth.accessToken ? (
                  <button
                    onClick={() => dispatch(userLoggedOut())}
                    className='btn btn-primary-outline mx-1 mx-lg-2 px-3'
                  >
                    Logout
                  </button>
                ) : (
                  <button onClick={() => navigate("/login")} className='btn btn-primary mx-1 mx-lg-2 px-3'>
                    Login
                  </button>
                )}
              </div>

              {auth.accessToken && (
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Tooltip id={`tooltip-bottom`}>
                      <strong>{auth?.user?.email}</strong>.
                    </Tooltip>
                  }
                >
                  <Button variant='secondary'>
                    <RxAvatar />
                  </Button>
                </OverlayTrigger>
              )}
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Appbar;
