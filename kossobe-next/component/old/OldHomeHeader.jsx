import React from 'react'
import HeroBanner from './HeroBanner'
import Image from 'next/image'


const OldHomeHeader = ({banner}) => {

  const ChevronBg =() => {<Image src={"/bgchevron.png"}
  layout="fill"
  objectFit="cover"
  />}

  return (
    <>
    <div className={`home-header`}>    
    <Image src={"/bgchevron.png"}
             layout="fill"
             objectFit="cover"
             style={{paddingTop:"-10%"}}
             />
      <HeroBanner banner = {banner}/>
    </div>
    </>
  )
}

export default OldHomeHeader