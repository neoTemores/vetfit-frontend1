import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();

    useEffect(() => {
        updateActiveTab()
    }, [location])

    const updateActiveTab = () => {

        document.querySelectorAll(".navLink").forEach(elem => {
            elem.classList.remove("activeLink")
            elem.id == location.pathname && elem.classList.add("activeLink")
        })
    }

    return (
        <div className='navbarContainer'>
            <Link className='navLink' id="/" to="/">Home</Link>
            <Link className='navLink' id="/api/all-records" to="/api/all-records">View All Records</Link>
            <Link className='navLink' id="/about" to="/about">About</Link>
        </div>
    )
}

export default Navbar