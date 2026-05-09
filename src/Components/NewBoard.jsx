import { useEffect, useState } from "react";
import Image from '../assets/BN.png';
import propTypes from 'prop-types';
const NewBoard = ({ category }) => {
    const [articles, setArticles] = useState([]);
    useEffect(
        () => {
            const apiKey = import.meta.env.VITE_NEWS_API;
            const queryCategory = category || "general";

            if (!apiKey) {
              console.error("Missing VITE_NEWS_API environment variable.");
              return;
            }

            const url = `https://newsapi.org/v2/top-headlines?country=us&category=${encodeURIComponent(queryCategory)}&apiKey=${apiKey}`;

            fetch(url)
              .then((res) => res.json())
              .then((data) => {
                const filteredArticles = (data.articles || []).filter(
                  (article) =>
                    article.title &&
                    article.description &&
                    article.urlToImage &&
                    article.url
                );
                setArticles(filteredArticles);
              })
              .catch(() => {
                setArticles(new Error("Error, Please check your internet connection or try again"));
              });
        },[category]
      );
  return (
    <div>
        <h1 className="text-3xl text-center m-3 tablets:text-4xl">Latest <span className = 'bg-btn-ccolor font-semibold text-white p-1 rounded-md'>News</span></h1>
        <section className="grid grid-cols-1 my-3 gap-2 px-3 py-2 sm:grid-cols-2 lg:grid-cols-3 largerScreen:grid-cols-4">
        {articles.map((news, index) => {
          return(
          <div className="Maincard-body" key={index}>
          <div className=''>
          <img src={news.urlToImage ? news.urlToImage : Image } className="h-72 w-full" alt="Image" id="image"/>
          </div>
            <div className=" flex justify-evenly items-start flex-col gap-4">
              <h5 className="font-semibold text-lg">{news.title ? news.title.slice(0, 70) + "..." : "Breaking News, Find out what is going on around the world..."}</h5>
              <p className="text-base">{news.description ? news.description.slice(0, 120) + "..." : "Find all necessary news on NewsCryst portal everyday and don't forget to subscribe..."}
                </p>
              <p className='text-red-500'>Source : {news.source.name}</p>
              <a href={news.url} className="bg-btn-ccolor p-2 text-white rounded-lg font-bold transition-all hover:scale-95">Read More</a>
              
            </div>
           </div>
          )
        })}
          
        </section>
    
      
    </div>
  )
}

NewBoard.propTypes = {
  category : propTypes.string
}


export default NewBoard
