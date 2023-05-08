import React from 'react'
//import styles from '../../styles/module/TrustClient.module.css'
import { urlFor, client } from '../../Utils/sanityClient'
import Image from 'next/image'
import Link from 'next/link';

const TrustClient = ({datas}) => {

  return (
      <div> 
        {datas.length > 1 &&
            datas.map((data,i)=>{
                
                const loader = ()=>{ return data.image && urlFor(data.image).width(200).height(200).url()}
                return(
                    <div>
                        <p>{data.name}</p>
                        <Image
                            loader={loader}
                            width={400}
                            height={400}
                            alt={`logo de ${data.name}`}
                            src={'empty'}
                            />
                    </div>
                );
            })
        }

    </div>
  )

}

export default TrustClient

export async function getStaticProps(){

  const datas = await client.fetch(`*[_type == "client"]`);
  return {
    props: {
      datas
    },
    revalidate: 1,
  };
};