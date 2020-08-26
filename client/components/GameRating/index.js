import React, { useEffect, useState } from 'react';
import './style.scss';

function GameRating(props) {
  const [circleInfo, setCircleInfo] = useState({
    class: 'totalRating',
    text: 'Rating'
  })

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      parseRating(props.totalRating);
    }

    return () => {
      mounted = false;
    }
  }, [])

  const parseRating = (ratingInput) => {
    let rating = parseInt(ratingInput);

    if (rating <= 14) {
      return (
        setCircleInfo({
          class: 'total-rating awful',
          text: 'Awful'
        })
      )
    } else if (rating <= 24) {
      return (
        setCircleInfo({
          class: 'total-rating veryBad',
          text: 'Very Bad'
        })
      )
    } else if (rating <= 34) {
      return (
        setCircleInfo({
          class: 'total-rating bad',
          text: 'Bad'
        })
      )
    } else if (rating <= 44) {
      return (
        setCircleInfo({
          class: 'total-rating poor',
          text: 'Poor'
        })
      )
    } else if (rating <= 54) {
      return (
        setCircleInfo({
          class: 'total-rating average',
          text: 'Average'
        })
      )
    } else if (rating <= 64) {
      return (
        setCircleInfo({
          class: 'total-rating fair',
          text: 'Fair'
        })
      )
    } else if (rating <= 74) {
      return (
        setCircleInfo({
          class: 'total-rating alright',
          text: 'Alright'
        })
      )
    } else if (rating <= 84) {
      return (
        setCircleInfo({
          class: 'total-rating good',
          text: 'Good'
        })
      )
    } else if (rating <= 94) {
      return (
        setCircleInfo({
          class: 'total-rating great',
          text: 'Great'
        })
      )
    } else {
      return (
        setCircleInfo({
          class: 'total-rating superb',
          text: 'Superb'
        })
      )
    }
  }
  
  return (
    <div className='ratings'>
      <div className={circleInfo.class}>
        <div>
          <span className='rating-number'>{props.totalRating}</span> <br />
          <span className='rating-name'>{circleInfo.text}</span>
        </div>
      </div>
      <div className='separate-ratings'>
        <p className='critic-rating'>
          <span className='rating-heading'>Critics: {props.criticRating}</span> <br />
          <span className='rating-count'>{props.criticRatingCount} critic ratings</span>
        </p>
        <p className='user-rating'>
          <span className='rating-heading'>IGDB Users: {props.userRating}</span> <br />
          <span className='rating-count'>{props.userRatingCount} user ratings</span>
        </p>
      </div>
    </div>
  )
}

export default GameRating;