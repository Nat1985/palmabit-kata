import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { PrimaryButton } from '../components/buttons'

function LandingPage() {

    return (
        <main>
            <img src={logo} alt="Logo Lithia" className='w-[120px] h-[120px]' />
            <div className='flex flex-col items-center text-center'>
                <div className="text-[3rem] font-thin mb-[-28px]">Welcome to</div>
                <h1>Lithia Motors Service!</h1>
            </div>
            <div className="max-w-[440px] text-center">
                <p>Lithia Motors wants to put in full control of your car-owning experience by providing easy to book service appointments from the comfort of your own home!</p>
            </div>
            <Link to="/services"><button className="primary">Get Started</button></Link>
        </main>
    )
}

export default LandingPage
