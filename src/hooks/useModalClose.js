import { useEffect, useRef } from "react"

function useModalClose(close, listenCapturing = true) {

  const ref = useRef()
  
    useEffect(() => {
      const handleClose = (e)=> {
        if(ref.current && !ref.current?.contains(e.target)) {
          // console.log("clicked", ref.current)
          close()
        }
      }
      
      document.addEventListener('click', handleClose, listenCapturing)
  
      return ()=> document.removeEventListener('click', handleClose, listenCapturing)
    }, [close, listenCapturing])

    return ref
}

export default useModalClose