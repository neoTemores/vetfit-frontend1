import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();

    useEffect(() => {
        updateActiveTab()
    }, [location])

    const updateActiveTab = () => {

        document.querySelectorAll(".navLink").forEach(elem => {
            elem.classList.remove("activeLink")
            elem.id === location.pathname && elem.classList.add("activeLink")
        })
    }

    return (
        <div className='navbarContainer'>
            <div className='titleContainer'>
                <h2 className="headerTitle">MockStock</h2>
            </div>

            <div className='linksContainer'>
                <Link className='navLink' id="/" to="/">Login</Link>
                <Link className='navLink' id="/portfolio" to="/all-records">Portfolio</Link>
                <Link className='navLink' id="/about" to="/about">About</Link>
            </div>

        </div>
    )
}

export default Navbar