import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import tech from "../../../public/working.svg"
import logo from "../../../public/Vector.svg"



export default function Home() {
  return (
    <>
    
      <h1 className={styles.logo}>
        <Image
          src={logo}
          alt="Picture of the author"
          width={30}
          height={30}
          style={{ objectFit: "contain" }}
        />
      </h1>
      <div className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.header}>GRADPATH</h1>
          <p className={styles.details}>Unlock Your Developer Potential with GradPath: Unleash YourDevelopment Skills and Showcase Your Knowledge.</p>
          <div className={styles.button}>
            <Link href="/signup">
              <button className={styles.signUp}>Get Started</button>
            </Link>
            <Link href="/login">
              <button className={styles.login}>Login</button>
            </Link>
          </div>
        </div>
        <div className={styles.imageClass}>
          <Image
            src={tech}
            alt="Picture of the author"
            width={800}
            height={800}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </>
  );
}
