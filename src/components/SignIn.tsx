import { SignInButton } from '@clerk/nextjs'
import React from 'react'

const SignIn = () => {
  return (
    <SignInButton mode='modal'>
      <button className='text-md font-bold text-gray-800 hover:text-green-600 cursor-pointer hoverEffect ' > Login </button>
    </SignInButton>
  )
}

export default SignIn
