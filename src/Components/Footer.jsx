import styles from './NewsItem.module.css'
const Footer = () => {
  return (
    
        <footer className={styles.footer}>
            <div className={styles.footerLogo}>
                <a href="/Newscryst/Components/Navbar.jsx">Newscryst</a>
            </div>
            <div className={styles.copyright}>
                <p>All Rights Reserved @ Tajamul Wani</p>
            </div>
            
        </footer>
      
  )
}

export default Footer
