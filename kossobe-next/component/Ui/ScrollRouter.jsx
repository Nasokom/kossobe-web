import React,{useRef,useState} from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '../../Utils/isomorphicLayout'
import Styles from '../../styles/module/ui/ScrollRouter.module.css'

import { useStateContext } from '../../context/StateContext';

gsap.registerPlugin(ScrollTrigger);
const ScrollRouter = ({categories,router,nextIndex}) => {


    const {userLang} = useStateContext()
    const main = useRef(null)
    
    useIsomorphicLayoutEffect(() => { 
        
        const slug = router.query.slug;
            
        const ctx = gsap.context((self) => {
            
            const inner = self.selector('#innerScroll')
            
            function endAnim(){
                document.documentElement.style.overflow ="hidden"
                const box = main.current.querySelector('.routerScrollCardBox ')
                box.querySelector('h4').style.translate ='0 100px';
                box.querySelector('h4').style.opacity ='0';
                box.classList.add('routerAnim')

                setTimeout(()=>{
                    router.push(`/services/${categories[nextIndex].slug.current}`)
                },500)
            }
            
            const tl = gsap.timeline({
            scrollTrigger: {
                trigger: main.current,
                start:"top 25%",
                end: "+=1000vh",
                scrub: true,
                pin: true,
                //markers:true,
                onLeave: () => endAnim(),
            }
            });
            
            //Image anim
            tl.to(inner,{
                translate:`0 -100%`,
            }).call(()=>endAnim())
        
        }, main);
        return () => ctx.revert();
    }, [router.query.slug]);



  return (
    <div className={Styles.container} ref={main}>

        <h3>{userLang.includes('fr') ?'Scroll pour decouvrir' : userLang.includes('de') ? "Scrollen Sie, um die anderens" : "Scroll to discover" } </h3>
        <h3>{userLang.includes('fr') ?'les autres services de kossobe' : userLang.includes('de') ? "Dienstleistungen von Kossobe zu entdecken" : "Kossobe's other services" }</h3>
        <br/>
        <div className={`routerScrollCardBox ${Styles.cardBox}`} style={{backgroundColor:categories[nextIndex].color.hex}} >
            <div className={Styles.card} style={{border:`4px solid ${categories[nextIndex].color.hex}`}}>
                <h4>{categories[nextIndex].name[userLang]}</h4>
                <div className={Styles.scrollElt} style={{backgroundColor:categories[nextIndex].color.hex}}id='innerScroll'></div>
            </div>
        </div>
    
    </div>
  )
}

export default ScrollRouter