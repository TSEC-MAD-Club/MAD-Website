imwport Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark ">
      <div className="container-fluid homebox" style={{ height: "90px" }}>
        <a
          className="navbar-brand"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginTop: '50px'
          }}
          href="/"
        >
          <Image
            className="navbar-logo"
            src="/assets/images/DevsClubLogo.png"
            width={80}
            height={80}
            objectFit={"cover"}
            alt=""
          />{" "}
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
              <Link href={"/CreateNotes"}>
                <a className="nav-link">Send Notes</a>
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
