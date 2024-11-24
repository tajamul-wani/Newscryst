// import propTypes from 'prop-types';
import menuIcon from '../assets/menuicon.svg'
const Navbar = ({setCategory}) => {

  function handleMenuIcon(){
    const navbar = document.getElementById('nav')
    navbar.classList.toggle('hidden')
  }
  return (
      <header className='bg-primary-bg-color p-4 w-screen flex justify-between items-center relative'>
        <div className="logo bg-btn-ccolor text-2xl max-w-fit p-2 text-white rounded-md font-semibold mb-3 tablets:text-3xl">NewsCryst</div>
        <nav className='shadow-custom-shadow hidden p-3 my-3 absolute right-0 w-full top-16 bg-primary-bg-color md:static md:top-0 md:shadow-none md:block' id='nav'>
          <ul className='list-none md:flex justify-end'>
            <li className="cursor-pointer mb-2 text-white hover:bg-btn-ccolor tablets:text-xl md:ml-2 md:border p-2 rounded-lg md:text-lg" onClick={() =>setCategory('technology')}>Technology</li>
            <li className="cursor-pointer mb-2 text-white hover:bg-btn-ccolor tablets:text-xl md:ml-2 md:border p-2 rounded-lg md:text-lg" onClick={() =>setCategory('entertainment')}>Entertainment</li>
            <li className="cursor-pointer mb-2 text-white hover:bg-btn-ccolor tablets:text-xl md:ml-2 md:border p-2 rounded-lg md:text-lg" onClick={() =>setCategory('sports')}>Sports</li>
            <li className="cursor-pointer mb-2 text-white hover:bg-btn-ccolor tablets:text-xl md:ml-2 md:border p-2 rounded-lg md:text-lg" onClick={() =>setCategory('Health')}>Health
            </li>
            <li className="cursor-pointer mb-2 text-white hover:bg-btn-ccolor tablets:text-xl md:ml-2 md:border p-2 rounded-lg md:text-lg" onClick={() =>setCategory('business')}>
                   Business</li>
          </ul>             
        </nav>
        <div className="menuIcon md:hidden">
        <button
          aria-label="Toggle navigation menu"
          onClick={handleMenuIcon}
        >
          <img src={menuIcon} alt="Menu icon" className="w-6" />
        </button>
        </div>
      </header>
  )
}

// Navbar.propTypes = {
//   setCategory : propTypes.string,
// }

export default Navbar
