import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark ">
      <div className="container-fluid homebox">
        <a className="navbar-brand" href="#">
          <Image src="/assets/images/logo.png" width={130} height={77} alt="" />{" "}
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
        <div
          className="desktop-menu collapse navbar-collapse"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-5">
              <Link href={"/"}>
                <a className="nav-link" aria-current="page" href="#">
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item me-5 ">
              <Link href={"/#aboutus"}>
                <a className="nav-link" aria-current="page" href="#">
                  About Us
                </a>
              </Link>
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
                  <Link href="/membership-drive">
                    <a className="dropdown-item">Membership Drive</a>
                  </Link>
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
              <Link href={"/road-map"}>
                <a className="nav-link" href="#">
                  Road Map
                </a>
              </Link>
            </li>
            <li className="nav-item me-5 ">
              <Link href={"/#members"}>
                <a className="nav-link" aria-current="page" href="#">
                  Members
                </a>
              </Link>
            </li>
            <li className="nav-item me-5 ">
              <Link href={"/#reach-us"}>
                <a className="nav-link" href="#">
                  Reach Us
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
