import React, { useState } from 'react'

import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper'
import { client } from '../../client'
import './Footer.scss'

const Footer = () => {

  const [formData, setFormData] = useState({name: '', email: '', message: ''})
  const [isFormSubmited, setIsFormSubmited] = useState(false)
  const [loading, setLoading] = useState(false)

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({...formData, [name]: value})
  }

  const handleSubmit = () => {
    setLoading(true)

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message,
    }

    client.create(contact)
      .then(() => {
        setLoading(false)
        setIsFormSubmited(true)
      })

  }

  return (
    <>
      <h2 className='head-text'>Take a coffe & chat with me</h2>

      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt="email" />
          <a href="mailto:marcos.caride.caubarrere@gmail.com" className='p-text'>marcos.caride.caubarrere@gmail.com</a>
        </div>

        <div className='app__footer-card'>
          <img src={images.mobile} alt="mobile" />
          <a href="tel:+54 911 3906 3944" className='p-text'>+54 911 3906 3944</a>
        </div>

      {!isFormSubmited ? 
        <div className='app__footer-form app__flex'>
          <div className='app__flex'>
            <input type="text" className='p-text' placeholder='Your Name' name='name' value={name} onChange={handleChangeInput} />
          </div>
          <div className='app__flex'>
            <input type="text" className='p-text' placeholder='Your Email' name='email' value={email} onChange={handleChangeInput} />
          </div>
          <div>
            <textarea className='p-text' placeholder='Your Message' value={message} name="message" onChange={handleChangeInput} />
          </div>
          <button type='button' className='p-text' onClick={handleSubmit}>{loading ? 'Sending' : 'Send Message'}</button>
        </div>
        :
        <div>
          <h3 className='head-text'>Thank you for getting in touch</h3>
        </div>
      }


      </div> 
        
        </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
)