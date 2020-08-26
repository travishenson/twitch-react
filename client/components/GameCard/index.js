import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function GameCard(props) {
  const parseBoxArtUrl = (url) => {
    return url.replace('{width}', '272').replace('{height}', '380');
  }

  return (
    <div className='game-card'>
      <div>
        <Link to={`/game/${props.id}`}>
          <img src={parseBoxArtUrl(props.boxArt)} alt={`${props.name}-box-art`} />
        </Link>
      </div>
      <Link to={`/game/${props.id}`} className='game-name'>
        {props.name}
      </Link>
    </div>
  )
}

export default GameCard;