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
          class: 'totalRating awful',
          text: 'Awful'
        })
      )
    } else if (rating <= 24) {
      return (
        setCircleInfo({
          class: 'totalRating veryBad',
          text: 'Very Bad'
        })
      )
    } else if (rating <= 34) {
      return (
        setCircleInfo({
          class: 'totalRating bad',
          text: 'Bad'
        })
      )
    } else if (rating <= 44) {
      return (
        setCircleInfo({
          class: 'totalRating poor',
          text: 'Poor'
        })
      )
    } else if (rating <= 54) {
      return (
        setCircleInfo({
          class: 'totalRating average',
          text: 'Average'
        })
      )
    } else if (rating <= 64) {
      return (
        setCircleInfo({
          class: 'totalRating fair',
          text: 'Fair'
        })
      )
    } else if (rating <= 74) {
      return (
        setCircleInfo({
          class: 'totalRating alright',
          text: 'Alright'
        })
      )
    } else if (rating <= 84) {
      return (
        setCircleInfo({
          class: 'totalRating good',
          text: 'Good'
        })
      )
    } else if (rating <= 94) {
      return (
        setCircleInfo({
          class: 'totalRating great',
          text: 'Great'
        })
      )
    } else {
      return (
        setCircleInfo({
          class: 'totalRating superb',
          text: 'Superb'
        })
      )
    }
  }
  
  return (
    <div className='ratings'>
      <div className={circleInfo.class}>
        <div>
          <span className='ratingNumber'>{props.totalRating}</span> <br />
          <span className='ratingName'>{circleInfo.text}</span>
        </div>
      </div>
      <div className='separateRatings'>
        <p className='criticRating'>
          <span className='ratingHeading'>Critics: {props.criticRating}</span> <br />
          <span className='ratingCount'>{props.criticRatingCount} critic ratings</span>
        </p>
        <p className='userRating'>
          <span className='ratingHeading'>IGDB Users: {props.userRating}</span> <br />
          <span className='ratingCount'>{props.userRatingCount} user ratings</span>
        </p>
      </div>
    </div>
  )
}

export default GameRating;