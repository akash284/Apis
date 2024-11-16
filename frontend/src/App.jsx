import { useEffect, useState } from 'react'


import './App.css'
import axios from 'axios';

function App() {
 

  // const [products,error,loading] = customReactQuery('/api/products');


  const [products,setProducts] = useState([])
  const [error,setError] = useState(false)
  const [loading,setLoading] = useState(false)
  const [search,setSearch] = useState('')
  
// jese hi component load ho to turant products ajaye 
// to turant api request krdege(basically api call krdege)
// ye krne k lie useEffect lgege bcz turant chahiye
 
useEffect( () => {

  // Race Condition aare he
  // purani request jes mene input field m a likha phir api call hui , k likha phirse call hui
  // multiple api calls hori he, isse bachne k lie abort controller use krte axios ka

  // axios se hum data bhi bhej skte hein await axios.get(urlpath,{yaha pe})
  const controller = new AbortController()
  // iif(immediately invoked function) bolte ise, ; used for differentiating ki pehla wla code chl gya ab ye chlega
  // () () first one is used for definition

  // edge case -1
  // wrong url daldi to error ayega usko handle kro
  ;( async() =>{

    try {
      setLoading(true)
      setError(false)
      //const response =  await axios.get('/api/products')

      // to prevent race condition used signal --> race condition prevent krke hume updated result milega last api call ka
      // signal work is it cancels the old api request that came in the same url but the issue is it sent in the catch so have to handle it
     
      // abhi purani api request cancel ni hori uske lie debouncing k concept use krte h
      //pr abhi updated result ara hein ui pr
      const response =  await axios.get('/api/products?search='+search, {

        signal: controller.signal
      })
      console.log(response.data);
      setProducts(response.data)
      setLoading(false)
    } catch (error) {

      if(axios.isCancel(error)){

          log("Request Cancelled",error.message)
          return;
      }
      setError(true)
      setLoading(false)   
    }
    
  })()


  // clean up method
  // jb component mount hua heto unmount bhi hota h( to save the memory)
  // uska jo kaam h voh khtm bhi hojata hein 

  return ()=>{
    controller.abort()
  }
  
} , [search])
 


// if(error){
//   return <h1>Something went wrong</h1>
// }

// // jese hi state change hoti heto pura component render/mount  hota hein
// if(loading){
//   return <h1>Loading...</h1>
// }

// by this point we can assume that data is being loaded and now it will run below wala code
  return (
    <>
    <h1>chai aur code</h1>
    <input type="text" placeholder="Search" 
     value={search}
     onChange={ (e) => setSearch(e.target.value)} />
    { error && (<h1>Something went wrong</h1>)}
    { loading && (<h1>Loading...</h1>)}
     
     <h2> Number of products are :{products.length} </h2>
    </>
  )
}

export default App



// custom react query --> making it generic

// const customReactQuery = (urlpath) => {

//   const [products,setProducts] = useState([])
//   const [error,setError] = useState(false)
//   const [loading,setLoading] = useState(false)
  
// // jese hi component load ho to turant products ajaye 
// // to turant api request krdege(basically api call krdege)
// // ye krne k lie useEffect lgege bcz turant chahiye
 
// useEffect( () => {

//   // iif(immediately invoked function) bolte ise, ; used for differentiating ki pehla wla code chl gya ab ye chlega
//   // () () first one is used for definition

//   // edge case -1
//   // wrong url daldi to error ayega usko handle kro
//   ;( async() =>{

//     try {
//       setLoading(true)
//       setError(false)
//       const response =  await axios.get(urlpath)
//       console.log(response.data);
//       setProducts(response.data)
//       setLoading(false)
//     } catch (error) {

//       setError(true)
//       setLoading(false)   
//     }
    
//   })()

// } , [])

// return [products,error,loading];
// }