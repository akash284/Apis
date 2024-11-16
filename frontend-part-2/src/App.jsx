import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios';


// frontend mera 5173 port no. pr chlra he, backend mera 3000 port to CORS error ayegi
// proxy lgadi  mene frontent pe ki jo bhi frontend se '/api' ki request jo jayegi voh as a 3000 port jayegi
// ab frontend bhi 3000 pe backend bhi 3000 p same port pr agye to cors wali error ni ayegi

// mera frontend wlehi localhost:5173 p chle pr voh server se contact krlega PROXY K karan 
function App() {
  const [jokes,setJokes] = useState([])


  useEffect( ()=>{

        // api call and it will get the response
        // '/api' as a proxy heto 'http://localhost:300/api/jokes as a request jayegi server ko
        // to same origin hi consider hogi backend p bhi
        axios.get('/api/jokes')
        .then( (response) =>{
         
          setJokes(response.data)
        }
      )
      .catch( (error) => {
        console.log(error);
      }
    )

  },[]);

  return (
    <>
     <h1>Chai aur React</h1>
     <p>Jokes : {jokes.length} </p>
     
     {/* isme (joke) => { } // brackets use krte heto return type dena hota hein,islie hume return type ni dena heto () ye use krege */}
     {
      jokes.map( (joke)=>(
        <div key={joke.id} >
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      )
    )
     }
    </>
  )
}

export default App
