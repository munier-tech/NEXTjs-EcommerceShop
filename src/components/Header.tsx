import React from 'react'
import Container from './Container'
import Logo from './Logo'
import HeaderMenu from './HeadeMenu'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import FavouriteButton from './FavouriteButton'
import SignIn from './SignIn'
import MobileMenu from './MobileMenu'
import { currentUser } from '@clerk/nextjs/server'
import { ClerkLoaded, SignedIn, UserButton } from '@clerk/nextjs'

const Header = async ({ className } : { className : string } ) => {
  const user = await currentUser()

  return (
    <header className="m-auto py-4 backdrop-blur-xl bg-white/10   border-b border-white/20 sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex w-auto md:w-1/3 gap-3 items-center justify-start">
            <MobileMenu />
            <div className="flex items-center gap-2">
              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
              <Logo />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block  transform hover:scale-105 transition-all duration-300">
            <HeaderMenu />
          </nav>

          {/* Action Buttons */}
          <div className="flex w-auto md:w-1/3 items-center justify-end gap-4">
            
            {/* Search */}
            <div className="hidden sm:block transform hover:scale-110 transition-all duration-200 hover:bg-white/20 p-2 rounded-xl">
              <SearchBar />
            </div>

            {/* Cart with badge */}
            <div className="relative transform hover:scale-110 transition-all duration-200 group">
              <div className="p-2 rounded-xl group-hover:bg-white/20">
                <CartIcon />
              </div>
              
            </div>

            {/* Favorites */}
            <div className="transform hover:scale-110 transition-all duration-200 group">
              <div className="p-2 rounded-xl group-hover:bg-white/20">
                <FavouriteButton />
              </div>
            </div>

            {/* Auth Section */}
            <ClerkLoaded>
              <div className="transform hover:scale-105 transition-all duration-200">
                <SignedIn>
                  <div className="p-1 rounded-full ">
                    <UserButton />
                  </div>
                </SignedIn>
                {!user && (
                  <div className="group">
                    <SignIn />
                  </div>
                )}
              </div>
            </ClerkLoaded>
          </div>
        </div>

       
      </Container>
    </header>
  )
}

export default Header