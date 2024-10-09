import { useState } from 'react'
import Navbar from './Components/Navbar.jsx'
import NewBoard from './Components/NewBoard'
import NewsItem from './Components/NewsItem.jsx'
import Footer from './Components/Footer.jsx';
function App() {
  const [ category, setCategory] = useState('general');
  
  return(
    <div>
      <Navbar setCategory= {setCategory}/>
      <NewBoard category = {category}/>
      <NewsItem/>
      <Footer/>
    </div>
  )

}

export default App
