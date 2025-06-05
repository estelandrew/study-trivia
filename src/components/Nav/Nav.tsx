"use client";

import { useRef } from "react";
import useAuth from "@/hooks/useAuth";
import { useAuthContext } from "@/context/AuthContext";
import styles from "./Nav.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

const Nav = () => {
  const { signOut } = useAuth();
  const { session } = useAuthContext();
  //const [hasSession, setHasSession] = useState<boolean>(false);
  //const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);

  const handleOpenMenu = (e: React.MouseEvent) => {
    if (
      e.currentTarget === menuRef.current &&
      !linksContainerRef.current?.classList.contains(styles.active)
    ) {
      linksContainerRef.current?.classList.add(styles.active);
    } else {
      linksContainerRef.current?.classList.remove(styles.active);
    }
  };

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const {
  //       data: { session },
  //     } = await getSession();
  //     setHasSession(!!session);
  //   };
  //   fetchSession();
  // }, [pathname, getSession]);

  // useEffect(() => {
  //   setIsSignedIn(hasSession);
  // }, [hasSession]);

  return (
    <div className={styles.container}>
      <div
        ref={menuRef}
        className={styles.menuButton}
        role="button"
        tabIndex={1}
        onClick={handleOpenMenu}
      >
        <GiHamburgerMenu />
      </div>
      <div ref={linksContainerRef} className={styles.linksContainer}>
        <ul className={styles.linksList}>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/browse">Browse</Link>
          </li>
          <li>
            {session?.user ? (
              <span onClick={signOut} style={{ cursor: "pointer" }}>
                Sign out
              </span>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
