"use client";
import React, { useState } from "react";
import styles from "../styles/navBar.module.css";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.brandName}>
        <Image src="/pymo.png" width={80} height={30} alt="pymo logo"/>
        
        <h1>
          Hospital-App
        </h1>
      </Link>
    </nav>
  );
};

export default Navbar;
