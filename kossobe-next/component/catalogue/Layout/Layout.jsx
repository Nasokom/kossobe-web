import React from 'react'
import Styles from './style.module.css'

const Layout = ({children}) => {
  return (
    <div className={Styles.page}>
        {children}
    </div>
  )
}

export default Layout