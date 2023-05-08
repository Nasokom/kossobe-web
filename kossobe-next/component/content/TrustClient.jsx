import React from 'react'
import styles from '../../styles/module/TrustClient.module.css'
import { urlFor} from '../../Utils/sanityClient'
import Image from 'next/image'
import Link from 'next/link';

const TrustClient = ({datas}) => {

    console.log(datas)
  return (
      <div className={styles.container}> 

            <h4>Ils nous font confiance</h4>

            <div className={styles.carousel}>
                
                {datas.map((data,i)=>{
                    
                    const loader = ()=>{ return data.image && urlFor(data.image).width(200).height(200).url()}
                    return(
                        <div key={i}>
                                <Link href={data.url ? data.url : ''} target={ typeof data.url == 'string' ? '_blank' : '_self'}>
                                <p>{data.name}</p>
                                <Image
                                    loader={loader}
                                    width={200}
                                    height={200}
                                    alt={`logo de ${data.name}`}
                                    src={'empty'}
                                    />
                                </Link>
                            </div>
                        );
                    })}
            </div>

    </div>
  )

}
export default TrustClient
