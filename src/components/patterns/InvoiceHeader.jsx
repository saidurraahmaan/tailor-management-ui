import React from 'react'
import { useSelector } from 'react-redux'
import {authInformation} from '../../modules/auth/authSlice.js'
import '../index.css'

const InvoiceHeader = () => {
    const {user} = useSelector(authInformation)
    console.log(user)
  return (
    <div>InvoiceHeader</div>
  )
}

export default InvoiceHeader