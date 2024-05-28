import React, { useEffect, useState } from 'react';
import Abcard from '../components/cards/Abcard';
import './Explore.css'
import { useAuth } from '../store/auth';


const ExploreAudiobooks = () => {
  const {audiobookURL} = useAuth()
  const [query, setQuery] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [audiobooks, setAudiobooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState('')

  const URL = audiobookURL; // Update with your actual backend URL

  useEffect(() => {
    if(audiobooks){
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
  }}, [URL]);


  const fetchAudiobooks = async (endurl, body) => {
    try {
      const response = await fetch(`${URL}/${endurl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const res_data = await response.json();
      if (response.ok) {
        // console.log(res_data)
        setAudiobooks(res_data);
      } else {
        console.log(res_data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  const handleSearch = () => {
    if(query){
      setErrorMsg('')
      fetchAudiobooks('search', { query });
    }
    else{
      setErrorMsg('Enter a query')
    }
  };
  
  const handleFilter = () => {
    fetchAudiobooks('filter', { author, genre });
  };

  return (
    <div className="exploreaudiobooks">
      <div className="inputform">
        <div className="form-row">
          <div className="searchbar">
            <input
              className="input-field"
              placeholder="Search audiobooks"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="filters">
            <input
              className="input-field"
              placeholder="Filter by author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              className="input-field"
              placeholder="Filter by genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <button className="btn" onClick={handleFilter}>
              Filter
            </button>
          </div>
        </div>
        <label className="error">{errorMsg}</label>
      </div>

      <div className="cards">
        {audiobooks.map((abdata, index) => (
          <Abcard
            key={index}
            id={abdata._id}
            stars={abdata.rating}
            title={abdata.title}
            description={abdata.description}
            coverImage={abdata.coverImage}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreAudiobooks;
