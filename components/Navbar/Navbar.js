import Image from "next/image";


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark ">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <Image src="/logo.png" width={130} height={77} alt="" />{" "}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-5">
              <a className="nav-link" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item me-5 ">
              <a className="nav-link" aria-current="page" href="#">
                About Us
              </a>
            </li>

            <li className="nav-item me-5  dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Events
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Membership Drive
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Workshop
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Internship Mela
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item me-5 ">
              <a className="nav-link" href="#">
                Projects
              </a>
            </li>
            <li className="nav-item me-5 ">
              <a className="nav-link" href="#">
                Road Map
              </a>
            </li>
            <li className="nav-item me-5 ">
              <a className="nav-link" href="#">
                Members
              </a>
            </li>
            <li className="nav-item me-5 ">
              <a className="nav-link" href="#">
                Reach Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
