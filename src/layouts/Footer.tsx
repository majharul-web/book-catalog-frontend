import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { TiSocialLinkedinCircular } from "react-icons/ti";

const Footer = () => {
  return (
    <div className='section-space'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <div>
              <h1 className='section-title'>BOOKSELF</h1>
              <p>
                The world’s first and largest digital marketplace for crypto collectibles and non-fungible
                tokens (NFTs). Buy, sell, and discover exclusive digital items.
              </p>
              <ul className='social-icon d-flex mt-3'>
                <li className='mx-1'>
                  <a href='#'>
                    <FaFacebook size={30} />
                  </a>
                </li>
                <li className='mx-1'>
                  <a href='#'>
                    <AiFillTwitterCircle size={32} />
                  </a>
                </li>
                <li className='mx-1'>
                  <a href='#'>
                    <TiSocialLinkedinCircular size={34} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-md-2 col-6'>
            <div>
              <h6 className='mb-3'>Market Place</h6>
              <ul className='footer-menu'>
                <li>
                  <a href='#'>All Books</a>
                </li>
                <li>
                  <a href='#'>New</a>
                </li>
                <li>
                  <a href='#'>Art</a>
                </li>
                <li>
                  <a href='#'>Sports</a>
                </li>
                <li>
                  <a href='#'>Utility</a>
                </li>
                <li>
                  <a href='#'>Music</a>
                </li>
                <li>
                  <a href='#'>Domain Name</a>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-md-2 col-6'>
            <div>
              <h6 className='mb-3'>My Account</h6>
              <ul className='footer-menu'>
                <li>
                  <a href='#'>Profile</a>
                </li>
                <li>
                  <a href='#'>NeFavoritew</a>
                </li>
                <li>
                  <a href='#'>My Collections</a>
                </li>
                <li>
                  <a href='#'>Settings</a>
                </li>
              </ul>
            </div>
          </div>

          <div className='col-md-4'>
            <div>
              <h6 className='mb-3'>Stay in the loop</h6>
              <p>
                Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and
                tips and tricks for navigating NFTs.
              </p>

              <div className='searchbox-wrap'>
                <input type='text' placeholder='Enter your email address..' />
                <button>
                  <span>Subscibe Now</span>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className='text-center text-muted pt-5'>Copyright © 2022 Avi Bookself</p>
      </div>
    </div>
  );
};

export default Footer;
