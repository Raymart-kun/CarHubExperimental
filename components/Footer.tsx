import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { footerLinks } from '@/constants'

const Footer = () => {
  return (
    <footer className='flex flex-col text-black-100 mt-5 border-t border-gray-100 z-0'>
      <div className='flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10'>
        <div className='flex flex-col justify-start items-start gap-6'>
          <Image
            src="/logo.svg"
            alt='logo'
            width={118}
            height={18}
            className='object-contain'
          />
          <p className='text-base text-gray-700'>
            CarHub 2024 <br /> All rights reserve &copy;
          </p>
        </div>

        <div className='footer__links'>
          {footerLinks.map((link) =>
            <div className='footer__link' key={link.title}>
              <h3>{link.title}</h3>
              {link.links.map((item) =>
                <Link className='text-gray-500' href={item.url} key={item.title}>
                  {item.title}
                </Link>
              )}
            </div>
          )}
        </div>
        </div>

        <div className='flex justify-between items-center flex-col md:flex-row mt-10 border-t border-gray-100 sm:px-16 px-6 py-10'>
          <p>@2024 Car Catalouge. All Rights Reserved</p>
          <div className='footer__copyrights-link'>
            <Link className='text-gray-500  text-nowrap' href={'/'}>
              Privacy Policy
            </Link>
            <Link className='text-gray-500 text-nowrap' href={'/'}>
              Terms of Use
            </Link>
          </div>
        </div>

    </footer>
  )
}

export default Footer