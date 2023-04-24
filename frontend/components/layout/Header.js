import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import AuthContext from "../../context/AuthContext";

const Header = () => {
  const { loading, user } = useContext(AuthContext);

  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/">
          <div className="logoWrapper">
            <div className="logoImgWrapper">
            <Image width="35" height="35" src="/images/logo.png" alt="" />
            </div>
            <span className="logo1">Hamro</span>
            <span className="logo2">Job</span>
          </div>
        </Link>
        <div className="btnsWrapper">
          <Link href="/employeer/jobs/new">
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </Link>
          {user ? (
            <div className="btn dropdown-ml-3">
              <Link
                href=""
                className="btn dropdown-toggle mr-4"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>Hi, {user.first_name}</span>{" "}
              </Link>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                <Link href="/employeer/jobs">
                  <span className="dropdown-item">My Jobs</span>
                </Link>
                <Link href="/me/applied">
                  <span className="dropdown-item">Jobs Applied</span>
                </Link>
                <Link href="/me">
                  <span className="dropdown-item">Profile</span>
                </Link>
                <Link href="/upload/resume">
                  <span className="dropdown-item">Upload Resume</span>
                </Link>
                <Link href="/">
                  <span className="dropdown-item text-danger">Logout</span>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href="/login">
                <button className="loginButtonHeader">
                  <span>Login</span>
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
