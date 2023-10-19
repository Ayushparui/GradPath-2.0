"use client"
import styles from "./styles.module.css"
import Logout from "@/components/Logout/Logout"
import Profile from "@/components/Profile/Profile"
import Link from "next/link"
import Dashboard from "@/../../public/dashboard.png"
import Network from "@/../../public/network.png"
import Create from "@/../../public/tab.png"
import Image from "next/image"

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.nav_main}>
                <div className={styles.nav__logo}>
                    <h1>Hello I'm Logo</h1>
                </div>
                <div className={styles.nav__links}>
                    <ul>
                        <li>
                            <div className={styles.image}>
                                <Image src={Dashboard} alt="Dashboard png" height={14} width={14}></Image>
                            </div>
                            <Link href={`/dashboard/my-projects`} className={styles.links}>Dashboard</Link>
                        </li>
                        <li>
                            <div className={styles.image}>
                                <Image src={Network} alt="Dashboard png" height={18} width={18}></Image>
                            </div>
                            <Link href={`/project-hub`} className={styles.links}>Projects Hub</Link>
                        </li>
                        <li>
                            <div className={styles.image}>
                                <Image src={Create} alt="Dashboard png" height={15} width={15}></Image>
                            </div>
                            <Link href={`/create-project`} className={styles.links}>
                                Create Projects
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.nav__logout}>
                    <Logout />
                </div>
            </div>

            {/* <h1>Hello From Nav</h1>
            <Link href={`/dashboard/my-projects`}>My Projects</Link>
        <br /> 
        <Link href={`/dashboard/collections`}>Collections</Link> 
        <br />
        <Link href={`/project-hub`}>Projects Hub</Link>
        <br />
        <Link href={`/create-project`}>Create Projects</Link>
        <Logout/>
        <Profile /> */}
        </nav>
    )
}

export default Nav