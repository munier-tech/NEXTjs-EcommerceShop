import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import Container from './Container';

const FooterTop = () => {

    interface ContactInfo {
      title: string;
      subtitle: string;
      icon: React.ReactNode;
    }
  

    const data: ContactInfo[] = [
    {
    title : "Visit Us",
    subtitle : " Hargeisa, Somaliland",
    icon: ( 
    <MapPin className='h-6 w-6 text-blue-600 hover:text-blue-700 transition-colors duration-300'  />
   )
  },
    {
    title : "Work Hours",
    subtitle : "saturday - thursday: 8:00 AM - 5:00 PM, friday: Closed",
    icon: ( 
    <Clock className='h-6 w-6 text-green-600 hover:text-green-700 transition-colors duration-300'  />
   )
  },
    {
    title : "Call us ",
    subtitle : "+252 63 8664646",
    icon: ( 
    <Phone className='h-6 w-6 text-purple-600 hover:text-purple-700 transition-colors duration-300' />
   )
  },
    {
    title : "Email us",
    subtitle : "MassDropp@gmail.com",
    icon: ( 
    <Mail className='h-6 w-6 text-red-600 hover:text-red-700 transition-colors duration-300' />
   )
  }
  ]
  
  return (
    <Container>
       <div className='py-8 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-50'>
      {data?.map(( item ) => (
        <div key={item.title} className='group p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-white  hover:border-blue-100'>
          <div className='flex items-start space-x-3'>
            <div className='p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300'>
              {item.icon}
            </div>
            <div className='flex flex-col space-y-1'>
              <h4 className='font-bold text-gray-800 text-lg group-hover:text-gray-900 transition-colors duration-300'>{item.title}</h4>
              <p className='text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>{item.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </Container>
  )
}

export default FooterTop