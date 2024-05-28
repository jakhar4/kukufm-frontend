import React, { useEffect, useState } from 'react'
import './Ab.css'
import PlayCircleFilled from '@mui/icons-material/PlayCircleFilled';
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../store/auth'
import Reviews from '../reviews/Reviews';
import { Rating } from 'react-simple-star-rating'

const audio =  [['arcvx ko', 'cxz se', 'ZX takk', 'zxc mein'],['gh ko', 'jj se', 'sd takk', 'gh mein'],['fdgf ko', 'gh se', ' ghtakk', 'ghj mein']]
const listens = '24k'
const genre = ['hindi','cultural','educative','science']

 

const Ab = () => {
  
  const {isLoggedIn, audiobookURL} = useAuth()
  const location = useLocation()
  const [abdata, setData] = useState([])
  const URL = `${audiobookURL}${location.pathname.split('/')[2]}`
  const [newReview, setNewReview] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [reviewError, setReviewError] = useState('')
  const [reviewFetched, setReviewFetched] = useState(true) // when review is submitted reviews column must update
    useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const res_data = await response.json();
        // console.log(res_data.reviews)
        if (response) {
          setData(res_data)          
        } else {
          console.log(res_data.message || "Invalid credentials");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }};
    fetchDetails();
  }, [URL]);
      
      
// function for submitting review----------------
      const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if(!isLoggedIn){
          return setReviewError('please login to give your valuable review')
        }
        else {
            try {
              const response = await fetch(`${URL}/reviews`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                  review: newReview,
                  rating: newRating,
                }),
              });
              const res_data = await response.json();
              console.log(res_data)
              if (response.ok) {
                setNewReview('');
                setNewRating(0);
                setReviewFetched(false)
              } else {
                console.log(res_data.message || 'Failed to add review');
              }
            } catch (error) {
              console.log(`Error: ${error.message}`);
          }
         }
      };


      // for starrating
      const handleRating = (rate) => {
        setNewRating(rate)
      }




  return (
    <>
    <div className="audiobook_row">
<div className="col">
  <div className="title">{abdata.title}</div>
  <div className="cover">
    <img src={abdata.coverImage} alt="" />
  </div>
  <div className="details">
    <div className="flex">
      <div className="listens boxchip">Listens: {listens}</div> {/* Added label for clarity */}
      <div className="rating boxchip">Rating: {abdata.rating}</div> {/* Added label for clarity */}
    </div>
    <div className="genre_container">
      {(abdata.genre?abdata.genre:genre).map((g, index) => (
        <span key={index} className="genre boxchip">{g}</span>
      ))}
    </div>
    <hr style={{marginTop:'20px'}} />
    <div className="author">
      <div className="avatar"><img src='https://picsum.photos/400/300' alt="" /></div>
      <div className="author_name">Author: {abdata.author}</div> {/* Added label for clarity */}
    </div>
    <hr />
    <div className="descriptions">
      <div className="description_title">Details</div>
      <p>{abdata.description}</p>
    </div>
  </div>
</div>

      <div className="col">
        {audio.map((season,seasonIndex)=>{
            return <div key={seasonIndex}>
            <div className="season boxchip"> Season {seasonIndex + 1}</div>
            {season.map((episode,index)=>{
                return<div key={index} className="episodes"> 
                    <div> <PlayCircleFilled className='play_icon' style={{fontSize:'40px'}} /> 
                    <div className="episode_title">E{index+1} : {episode}</div> </div>
                </div>
            })}
            </div>
        })}
      </div>
<div className="col">
        <div className="reviewform">
          <div className="reviewheading">
            Reviews
          </div>
              <div className={'review_input_container'}>
                <input
                  value={newReview}
                  placeholder="Write review here"
                  onChange={(ev) => setNewReview(ev.target.value)}
                  className={'reviewinput'}
                />
              </div>
              <div className="rating">
                  <Rating onClick={handleRating} initialValue={newRating} />
              <button onClick={handleReviewSubmit}>Submit</button>
              </div>
            <label className="error">{reviewError}</label>
          </div>
            <Reviews URL={URL} reviewFetched={reviewFetched}/>
        </div>
    </div>
    </>
  )
}

export default Ab