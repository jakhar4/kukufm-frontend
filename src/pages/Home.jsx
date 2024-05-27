import React, { useEffect, useState } from 'react'
import Abcard from '../components/cards/Abcard'

const Home = () => {
  // const [errorMsg, setErrorMsg] = useState('')
  const [audiobooks, setAudiobooks] = useState([]);
  
  useEffect(() => {
    const URL = 'http://localhost:5000/api/audiobook'
    const fetchAudioBooks = async () => {
      try {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const res_data = await response.json();
        // console.log(res_data)
        if (response.ok) {
          setAudiobooks(res_data)          
        } else {
          console.log(res_data.message || "Invalid credentials");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    };

    fetchAudioBooks();
      }, []);

  return (
    <>
    {audiobooks.map((abdata, index)=>{
      return <Abcard key={index} id={abdata._id} stars={abdata.rating} title={abdata.title} description={abdata.description} coverImage={abdata.coverImage}/>
    })}
    </>
  )
}

export default Home



