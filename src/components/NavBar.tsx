"use client";
import React, { useState } from "react";
import styles from "../styles/navBar.module.css";
import Link from "next/link";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.brandName}>
        Mi Sitio
      </Link>
      <button
        className={styles.toggleButton}
        onClick={() => setIsNavExpanded(!isNavExpanded)}
      >
        Menú
      </button>
      <div
        className={`${styles.navLinks} ${isNavExpanded ? styles.expanded : ""}`}
      >
        <Link href="/hospitales">hospitales</Link>
        <Link href="/entregas">entregas</Link>
        <Link href="/insumos">insumos</Link>
      </div>
    </nav>
  );
};

export default Navbar;
