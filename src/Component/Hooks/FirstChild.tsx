import React, { useEffect } from 'react'
import SecondChild from './SecondChild';

function FirstChild() {
    console.log("First Child");
       useEffect(() => {
          console.log("mount in first");
          
        
          return () => {
            console.log("unmount in first");
            
          }
        }, [])
  return (
    <div>FirstChild
            <SecondChild/>

    </div>
  )
}

export default React.memo(FirstChild)