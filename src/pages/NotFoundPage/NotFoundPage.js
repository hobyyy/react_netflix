import React from 'react'
import './NotFoundPage.style.css'

const NotFoundPage = ({errorType}) => {

  console.log('err',errorType);
  

  return (
   <div class="container">
    <div class="copy-container center-xy">
      <p>
        {errorType=='noSearch' ? 'Search results not found' : '404, page not found.'}
      </p>
      <span class="handle"></span>
  
    </div>
  </div>
 
  )
}

export default NotFoundPage