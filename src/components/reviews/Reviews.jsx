import React, { useEffect, useState } from 'react';
import Review from './Review';
import './Review.css'


const Reviews = ({URL, reviewFetched}) => {
  const [data, setData] = useState([])

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
        if (response) {
          setData(res_data.reviews)     
        } else {
          console.log(res_data.message || "Invalid credentials");
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }};
      if(reviewFetched){fetchDetails()}  // to trigger re fetching reviews
    fetchDetails();
  }, [URL, reviewFetched]);

  return (
    <section className='reviews_section'>
      <div className="review_section_container">
        {data.map((review, index) => (
          <Review
            key={index}
            profileImg={`https://picsum.photos/400/${Math.floor(Math.random() * (400 - 300 + 1)) + 300}`}
            rating={review.rating}
            comment={review.review}
            name={review.userName}
          />
        ))}
      </div>
    </section>
  );
};

export default Reviews;
