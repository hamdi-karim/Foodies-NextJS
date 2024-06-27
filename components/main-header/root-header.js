import logoImg from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";
import classes from "./root-header.module.css";

const RootHeader = () => {
  return (
    <>
      <MainHeaderBackground />

      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image src={logoImg} alt="A table with food" priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink pathName="/meals">Browse Meals</NavLink>
            </li>

            <li>
              <NavLink pathName="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default RootHeader;
