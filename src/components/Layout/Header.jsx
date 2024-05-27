import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../store/auth";

const Header = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <div className="navbar_container">
        <div className="navbar">
          <div className="options">
            <Link to="/" style={{ color: "#FF7F50" }}>
              {" "}
              <span style={{ color: "#FFFFFF" }}>KUKU</span>
              <span
                style={{
                  color: "#ee2a3a",
                  fontSize: "25px",
                  backgroundColor: "white",
                  borderRadius: "9%",
                }}
              >
                FM
              </span>{" "}
            </Link>
            {/* <Link className='flex' to='/Authors'>Authors</Link>
                <Link className='flex' to='/Genre'>Genre</Link> */}
          </div>

          {isLoggedIn ? (
            <div className="hover options">
              <Link to="/Explore">Explore</Link>
              <Link className="flex" to="/logout">
                Logout
              </Link>
            </div>
          ) : (
            <div className="hover options">
              <Link to="/Explore">Explore</Link>
              <Link className="flex" to="/signin">
                Login
              </Link>
              <Link className="flex" to="/signup">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
