import styles from './NewsItem.module.css';
import Image from '../assets/BN.png';
const NewsItem = ({title, description, src, url}) => {
  return (
    <section className={styles.mainCard}>
        <div className={styles.cardBody}>
            <img src={src?src:Image} className={styles.cardImg} alt="NewsImage"/>
            <div className={styles.cardInner}>
                <h5 className={styles.cardTitle}>{title ? title.slice(0, 50) : "Breaking News"}</h5>
                <p className={styles.cardText}>{description ? description.slice(0, 130) : "Updates: What is going on today, Check out here."}</p>
                <a href={url} className={styles.cardLink} target="_blank">Read more</a>
            </div>
        </div>
    </section>

  )
}


export default NewsItem
