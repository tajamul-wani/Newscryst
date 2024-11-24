import github from '../assets/github.svg'
import insta from '../assets/instagram.svg'
import linkedin from '../assets/linkedin.svg'
const Footer = () => {
  return (
    
        <footer className='bg-primary-bg-color p-3 text-center md:grid grid-cols-2 md:p-2'>
            <div className='m-2 md:flex items-center justify-start gap-2'>
                <a href = '#' className="bg-btn-ccolor p-2 rounded-lg text-3xl text-white font-semibold md:text-4xl">Newscryst</a>
                <div className="socialMedia cursor-pointer flex justify-center gap-7 p-2 mt-3 ">
                    <a href="https://github.com/TAJAMUL11" target='_blank' ><img src={github} alt="SocialMedia"  className='w-6'/></a>
                    <a href="https://www.linkedin.com/in/tajamul-wani/" target='_blank'><img src={linkedin} alt="SocialMedia" className='w-6' /></a>
                    <a href="https://www.instagram.com/tajamul__wani_/" target='_blank'><img src={insta} alt="SocialMedia" className='w-6 '/></a>
                </div>

            </div>
            <div className=''>
                <div className="details text-white font-bold m-2">
                    <p>Powered By <a href="https://newsapi.org/" className='text-btn-ccolor cursor-pointer' target='_blank'>NewsAPI</a></p>
                </div>
                <p className='text-white font-bold'>All Rights Reserved @ Tajamul Wani</p>
            </div>
            
        </footer>
      
  )
}

export default Footer
