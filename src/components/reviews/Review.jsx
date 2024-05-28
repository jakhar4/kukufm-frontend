import React from 'react';
import Stars from './Stars';

const Review = ({ profileImg, name, rating, comment }) => {
  return (
    <div className="review_box">
      <div className="box_top">
        <div className="profile">
          <div className="profile_img">
            <img src={profileImg} alt="" />
          </div>
          <div className="username">
            <strong>{name}</strong>
          </div>
        </div>
        <Stars rating={rating}/>
      </div>
      <div className="usercomment">
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default Review;
