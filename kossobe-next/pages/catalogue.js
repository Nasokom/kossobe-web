import React, {useRef,useState} from 'react'
import { useStateContext } from '../context/StateContext'
import { client, urlFor } from '../Utils/sanityClient';
import Image from 'next/image'
import ComplexText from '../component/Ui/ComplexText';
import styles from '../styles/Pages/About.module.css'
import Layout from '../component/catalogue/Layout/Layout';
import ListItem from '../component/catalogue/ListItem/ListItem.jsx';

const catalogue = () => {

    
  return (
  <Layout>
     <h1>Notre Catalogue</h1>

    <ListItem/>

  </Layout>

  )
}

export default catalogue