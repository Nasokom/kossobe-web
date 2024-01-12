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
                end: "+=1000vh",
                scrub: true,
                pin: true,
                ///markers:true,
              }
            });

            const cards = main.current.querySelectorAll('.service-card')

            cards.forEach((card,i) => {

                const wrapper = card.querySelector('.wrapper-card')
                const textBox = card.querySelector('.service-card-text');
                const text = card.querySelector('.complex-text');
                var textHeight = text.offsetHeight;
                var textBoxHeight = textBox.offsetHeight;
                const ratioTxtAndBox = textHeight / textBoxHeight
                console.log(`${i} =  ${ratioTxtAndBox}`)

                tl.to(text,{
                    onStart : ()=>setSelectedCard(i),
                    opacity:1,
                    duration: 30,
                })

                tl.to(text,{
                    y: ratioTxtAndBox <= 1? 0: textBoxHeight - (textHeight+70),
                    duration: ratioTxtAndBox <= 1? 20: //45,
                    (50*ratioTxtAndBox),
                })

                tl.to(text,{
                    opacity:1,
                   duration:15
                })

                tl.to(text,{
                    opacity:1,
                    //onStart : ()=> i < 2 && setSelectedCard(i+1),
                    onComplete : ()=> i < 2 &&  setSelectedCard(i+1),
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