import React from "react";
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
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

          <Link href="/login">
            <button className="loginButtonHeader">
              <span>Login</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;