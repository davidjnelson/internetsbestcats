import React from 'react'
import { PostCard } from './PostCard';
import PropTypes from "prop-types";

const PostsList = ({posts, message, handlePinIconClick}) => {
  return message ?
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%'
    }}>
      {message}
    </div> :
    <div style={{
      width: '100%'
    }}>
      {posts.map((post, index) => {
        return <PostCard key={index} post={post} handlePinIconClick={handlePinIconClick} />
      })}
    </div>
};

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }).isRequired).isRequired,
  message: PropTypes.string
};

export { PostsList }
