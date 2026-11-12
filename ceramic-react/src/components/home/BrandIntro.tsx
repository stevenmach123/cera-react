import React, { PureComponent, useState } from 'react'
import './BrandIntro.scss'
interface BrandIntroProps {
    h?:string
}
type tabName = 'Business'|'Architect'
const BrandIntro: React.FC<BrandIntroProps> = ({ h }) => {
  const tab:{name:tabName,[key:string]:any}[] = [{name:'Business',des:'responsive to your need',des2:'we cover you on every aspect of home design'},{name:'Architect',des:'hellow'}]
  const [curTab,setCurTab] = useState<tabName>(tab[0].name);
  const tab_tar = tab.find((it)=>it.name == curTab)
  return <section className="intro-section">
    <div className="intro-container">
        <div className="tab-bar">{
            tab.map((item,i)=>(
            <div key={i} className={`tab-bar-item ${curTab === item.name ? 'active' : ''}`} onClick={()=>setCurTab(item.name)} >{item.name}</div>
            ))
        }</div>
        <div>{
            curTab === 'Business'?(<div>
            <span className="head-title head-number">1. <span className="head-title">{tab_tar.name}</span></span> <br/>
            <span>{tab_tar.des}</span> <br/>
            <span>{ tab_tar.des2}</span>
            

            </div>):(<div>

            </div>)
        }</div>
       
    </div>

   
  
  
  </section>;
};

export default BrandIntro;