import React, { useEffect } from 'react'

function SecondChild() {
    console.log("second child");
    useEffect(() => {
      console.log("mount in second");
      
    
      return () => {
        console.log("unmount in second");
        
      }
    }, [])
    
  return (
    <div>SecondChild</div>
  )
}

export default SecondChild