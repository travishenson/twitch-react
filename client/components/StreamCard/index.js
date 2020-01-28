import React from 'react';
import './style.scss';

function StreamCard(props) {
  const parseThumbnailUrl = (url) => {
    return url.replace('{width}', '444').replace('{height}', '250');
  }

  return (
    <div className='streamCard'>
      <img src={parseThumbnailUrl(props.thumbnail)} alt={`${props.id}-thumbnail`} />
      <h3>{props.title}</h3>
      <p>{props.username}</p>
      <p>{props.viewers} viewers</p>
    </div>
  )
}

export default StreamCard;