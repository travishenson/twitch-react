import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function GameCard(props) {
  const parseBoxArtUrl = (url) => {
    return url.replace('{width}', '272').replace('{height}', '380');
  }

  return (
    <div className='gameCard'>
      <div>
        <Link to={`/game/${props.id}`}>
          <img src={parseBoxArtUrl(props.boxArt)} alt={`${props.name}-box-art`} />
        </Link>
      </div>
      <Link to={`/game/${props.id}`} className='gameName'>
        {props.name}
      </Link>
    </div>
  )
}

export default GameCard;