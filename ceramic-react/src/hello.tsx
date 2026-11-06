import React, { useCallback, useState } from 'react'

export default function Hello() {
  const [h,setH] = useState<number>(0); 
  const Fun_v = useCallback(()=>{
    console.log("callback",h)
    setH(v=>v+1)
  },[])
  const Fun_v2 = useCallback(()=>{
    setH(h+1)
  },[h])
  return (
    <div>
        <p>{h}</p>
        <button onClick={Fun_v}>Action</button>
        <button onClick={Fun_v2}>Action2</button>
      
    </div>
  )
}
