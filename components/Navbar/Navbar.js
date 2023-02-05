import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark ">
      <div className="container-fluid homebox">
        <a className="navbar-brand" href="/">
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
            <li className="nav-item me-5 ">
              <Link href={"/ViewReminder"}>
                <a className="nav-link">View Reminder</a>
              </Link>
            </li>
            <li className="nav-item me-5 ">
              <Link href={"/#members"}>
                <a className="nav-link" aria-current="page" href="#">
                  Logout
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
