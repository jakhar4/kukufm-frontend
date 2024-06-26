import React, { useEffect, useState } from 'react'
import Abcard from '../components/cards/Abcard'
import { useAuth } from '../store/auth';
const Home = () => {
  const {audiobookURL} = useAuth();
  const [audiobooks, setAudiobooks] = useState([]);
  const URL = audiobookURL;   //usrl stored in contextapi
  
  useEffect(() => {
    const fetchAudioBooks = async () => {
      try {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
 
        const res_data = await response.json();
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
      }, [URL]);

  return (
    <>
    {audiobooks.map((abdata, index)=>{
      return <Abcard key={index} id={abdata._id} stars={abdata.rating} title={abdata.title} description={abdata.description} coverImage={abdata.coverImage}/>
    })}
    </>
  )
}

export default Home
