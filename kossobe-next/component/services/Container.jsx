import React, {useState, useRef} from 'react'
import ServiceCard from '../content/ServiceCard'
import { useIsomorphicLayoutEffect } from '../../Utils/isomorphicLayout';
import { gsap } from 'gsap';
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import Styles from '../../styles/Pages/Services.module.css'

gsap.registerPlugin(ScrollTrigger);
const Container = ({services}) => {
    const main = useRef();
    const [selectedCard, setSelectedCard] = useState(0);

    useIsomorphicLayoutEffect(()=>{

        const ctx = gsap.context((self) => {
      
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: main.current,
                start:"-50vh top",
                end: "+=300vh",
                scrub: true,
                pin: true,
                ///markers:true,
              }
            });

            const cards = main.current.querySelectorAll('.service-card')

            cards.forEach((card,i) => {

                const textBox = card.querySelector('.service-card-text');
                const text = card.querySelector('.complex-text');
                var textHeight = text.offsetHeight;
                var textBoxHeight = textBox.offsetHeight;
                const ratioTxtAndBox = textHeight / textBoxHeight
                
                tl.to(text,{
                    color:'red',
                    duration: 100,
                })

                tl.to(text,{
                    y: textBoxHeight - textHeight,
                    duration: textBoxHeight - textHeight >= 0? 0: 100*(3*ratioTxtAndBox),
                })

                tl.to(text,{
                    opacity:1,
                    onStart : ()=>setSelectedCard(i),
                    onComplete : ()=> i < 1 && setSelectedCard(i+1),
                    onReverseComplete : ()=> setSelectedCard(i)
                })


            });
   
        }, main);
        return () => ctx.revert();
    },[])

  return (
    <div className={Styles.service_container} ref={main}>

        {services && services.services.map((service,i)=>{

            return(

                <ServiceCard
                    data={service} i={i}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                    key={i}
                    color1={services.color.hex}
                    color2={services.colorTxt.hex}
                />
            )
        })}
        

    </div>
  )
}

export default Container