import { useState } from 'react'
import Navbar from './Components/Navbar.jsx'
import NewBoard from './Components/NewBoard'
import Footer from './Components/Footer.jsx';
function App() {
  const [ category, setCategory] = useState('general');
  
  return(
    <div>
      <Navbar setCategory= {setCategory}/>
      <div className="container-main">
      <NewBoard category = {category}/>
      <Footer/>

      </div>
     
    </div>
  )

}

export default App
