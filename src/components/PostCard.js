import React from 'react'
import PropTypes from 'prop-types';
import RoomIcon from '@material-ui/icons/Room';

const getImage = (url) => {
  if(url) {
    return <img alt="" style={{
      width: '10%',
      height: '50%',
      padding: '2%'
    }} src={url} />
  }
};

const PostCard = ({post, handlePinIconClick}) => {
  return <div style={{
      backgroundColor: '#fff',
      margin: '2%',
      width: '96%',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: '5px',
      display: 'flex'
    }}>
      <RoomIcon
        style={{
          marginTop: '2%',
          marginRight: '2%',
          marginBottom: '2%',
          marginLeft: '4%',
          fontSize: '36px',
          color: post.saved ? 'blue' : 'black'
        }}
        onClick={() => {
          handlePinIconClick(post);
        }} />
      {getImage(post.thumbnail)}
      <div style={{
        backgroundColor: '#fff',
        padding: '2%',
        borderRadius: '5px'
      }}>
        <a href={post.link} target="_blank">
          <h2 style={{
            fontSize: '150%'
          }}>{post.title}</h2>
        </a>
      </div>
    </div>
};

PostCard.propTypes = {
  post: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired
};

export { PostCard }
