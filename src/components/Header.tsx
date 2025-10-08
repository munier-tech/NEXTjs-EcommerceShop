import React from 'react'
import Container from './Container'
import Logo from './Logo'
import Link from 'next/link'
import HeaderMenu from './HeadeMenu'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import FavouriteButton from './FavouriteButton'
import SignIn from './SignIn'
import MobileMenu from './MobileMenu'

const Header = () => {

  return (
    <header
     className='m-auto py-5 backdrop-blur-3xl  text-black border-b border-b-black/20'>
      <Container>
        
      
      <div className='flex items-center justify-between' >
        {/* logo */}
      <div className='flex w-auto md:w-1/3 gap-2.5 md:gap-0 items-center justify-start' >
        <MobileMenu/>
        <Logo/>
      </div>
      {/* nav */}
      <nav>
        <HeaderMenu/>
      </nav>
      <div className='flex w-auto md:w-1/3 items-center justify-end gap-5' >
       <SearchBar/>
       <CartIcon/>
       <FavouriteButton/>
       <SignIn/>
      </div>
      </div>
      </Container>
    </header>
  )
}

export default Header

