
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Showcase Your Journey with GradPath</h1>
      <p>Unlock your codes potential with GradPath—empowering everyone to showcase brilliance.</p>
      <Link href={`/signup`}>
        Get Started
      </Link>
    </>
  );
}
