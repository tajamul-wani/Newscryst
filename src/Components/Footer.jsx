import React from 'react'
import styles from './NewsItem.module.css'
const Footer = () => {
  return (
    <div className={styles.footer}>
        <footer>
            <div className={styles.footerLogo}>
                <a href="#Home">Newscryst</a>
            </div>
            <div className={styles.copyright}>
                <p>All Rights Reserved @ Tajamul Wani</p>
            </div>
            
        </footer>
      
    </div>
  )
}

export default Footer
