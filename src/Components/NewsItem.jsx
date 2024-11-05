import styles from './NewsItem.module.css';
import Image from '../assets/BN.png';
import PropTypes from "prop-types";

const NewsItem = ({title, description, src, url, source}) => {
  return (
         <div className="card bg-dark text-light mb-3 d-inline-block mx-3 my-3 py-2 px-2" style={{width : "345px"}}>
          <div className={styles.imageCard}>
          <img src={src ? src : Image} className="card-img-top" alt="Image" style={{height : "210px", width : '325px', objectFit : 'cover'}}/>

          </div>
            <div className="card-body">
              <h5 className="card-title">{title ? title.slice(0 , 50) + "..." : "Breaking News..."}</h5>
              <p className="card-text">{description ? description.slice(0 , 80) + "..." : 
                                  "What's going on around the world? Find all the top Headlines ..."}
                </p>
              <p className={styles.sourceClass}>Source : {source}</p>
              <a href={url} className="btn btn-primary">Read More</a>
              
            </div>
           </div>

  

  )
}
NewsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  src: PropTypes.string,
  url: PropTypes.string,
  source : PropTypes.string
}


export default NewsItem
