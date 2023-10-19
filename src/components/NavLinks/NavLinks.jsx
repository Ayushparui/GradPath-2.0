"use client"
import Link from "next/link"
import styles from "./styles.module.css"

const NavLinks = () => {
    return (
        <div className={styles.navlinks}>
            <nav>
                <ul>
                    <li>
                        <Link href={`/dashboard/my-projects`} className={styles.links}>My Projects</Link>
                    </li>
                    <li>
                        <Link href={`/dashboard/collections`} className={styles.links}>Collections</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavLinks