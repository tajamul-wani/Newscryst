import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
const NewBoard = ({ category }) => {
    const [articles, setArticles] = useState([]);
    useEffect(
        () => {
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_NEWS_API}`
            fetch(url).then(res => res.json())
            .then((data) => {
              // Filter articles based on desired properties
              const filteredArticles = data.articles.filter(
                (article) =>
                  article.title &&
                  article.description &&
                  article.urlToImage &&
                  article.url
              );
              setArticles(filteredArticles);
            }).catch(() => {
              setArticles(new Error("Error, Please check your internet connection or Try again"))
            });
        },[category]);
  return (
    <div>
        <h1 className="text-center">Latest <span className = "badge text-light bg-primary fs-7">News</span></h1>
          {articles.map((news, index) => {
            return <NewsItem key = {index} title = {news.title} description = {news.description} src = {news.urlToImage} url = {news.url} source = {news.source.name} />

        })}
      
    </div>
  )
}


export default NewBoard
