import React from 'react'
import { Helmet } from '@dr.pogodin/react-helmet'

export default function MetaData({title}) {
  return (
    <Helmet>
        <title>{`${title} - ArunCart`}</title>
    </Helmet>
  )
}




// // native method for setting document title

// // src/hooks/useTitle.js
// import { useEffect } from 'react';
// export default function MetaData(title) {
//   useEffect(() => {
//     document.title = `${title}ArunCart`;
//   }, [title]);
// }
