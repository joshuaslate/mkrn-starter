import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './card.scss';

const Card = ({ title, image = {}, children }) => {
  let imageElement = null;

  if (image.linkTo) {
    imageElement = (
      <Link to={image.linkTo} className="card-media"><img src={image.src} title={image.title} alt={image.alt} /></Link>
    );
  } else if (image.src) {
    imageElement = (<img className="card-media" src={image.src} title={image.title} alt={image.alt} />);
  }

  return (
    <div className="card">
      {imageElement}
      {title && <div className="card-heading">{title}</div>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  image: PropTypes.shape({
    src: PropTypes.string,
    title: PropTypes.string,
    alt: PropTypes.string,
    linkTo: PropTypes.string,
  }),
  title: PropTypes.string,
};

export default Card;
