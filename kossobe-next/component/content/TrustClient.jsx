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
                    
                    const loader = ()=>{ return data.image && urlFor(data.image).height(200).url()}
                    return(
                        <div key={i}>
                                <Link href={data.url ? data.url : ''} target={ typeof data.url == 'string' ? '_blank' : '_self'}>
                                <p>{data.name}</p>
                                <Image
                                    loader={loader}
                                    fill={true}
                                    sizes="(max-width: 768px) 200px, (max-width: 1200px) 200px, 200px"
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
