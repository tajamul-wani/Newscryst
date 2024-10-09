
const Navbar = ({setCategory}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><span className="badge text-light bg-primary fs-4">Newscryst</span></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Contact</a>
        </li>
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Select Country
          </a>
          <div className="dropdown-menu" style={{cursor: "pointer"}}>
            <div className="dropdown-item" onClick={() => setCountry('jp')}>Ireland</div>
            <div className="dropdown-item" onClick={() => setCountry('mexico')}>Mexico</div>
            <div className="dropdown-item" onClick={() => setCountry('spain')}>Spain</div>
            <div className="dropdown-item" onClick={() => setCountry('us')}>India</div>
          </div>
        </li> */}

      <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            News Category
          </a>
          <div className="dropdown-menu" style={{cursor: "pointer"}}>
            <div className="dropdown-item" onClick={() =>setCategory('technology')}>Technology</div>
            <div className="dropdown-item" onClick={() =>setCategory('entertainment')}>Entertainment</div>
            <div className="dropdown-item" onClick={() =>setCategory('sports')}>Sports</div>
            <div className="dropdown-item" onClick={() =>setCategory('Health')}>Health</div>
            <div className="dropdown-item" onClick={() =>setCategory('science')}>Science</div>
          </div>
        </li>
        
       
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-primary" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  )
}

export default Navbar
