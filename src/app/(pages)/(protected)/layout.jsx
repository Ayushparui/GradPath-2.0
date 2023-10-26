"use client"
import authServices from '@/authentication/auth'
import { useState, useEffect } from 'react'
import { AuthProvider } from '@/context/authContext'
import Nav from '@/components/Nav/Nav'
import Header from '@/components/Header/Header'
import NavLinks from '@/components/NavLinks/NavLinks'
import styles from './styles.module.css'


export default function ProtectedLayout({ children }) {
  const [authStatus, setAuthStatus] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    authServices.isLoggedIn().then(setAuthStatus).finally(() => setLoader(false));
  }, []);

  return (
    <AuthProvider value={{ authStatus, setAuthStatus }}>
      {!loader && authStatus ? (
        <div className={styles.main}>
            <Nav />
          <div className={styles.content}>
            <Header />
            {/* <NavLinks /> */}
            <section>{children}
            </section>
          </div>
        </div>
      ) : (
        <p>Loading or Not Authenticated</p>
      )}
    </AuthProvider>
  );
}
