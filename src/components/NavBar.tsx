"use client";
import React, { useState } from "react";
import styles from "../styles/navBar.module.css";
import Link from "next/link";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.brandName}>
        Hospital-App
      </Link>
    </nav>
  );
};

export default Navbar;
