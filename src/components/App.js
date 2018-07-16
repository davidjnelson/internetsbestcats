import React from 'react';
import { ConnectedPostsList } from '../containers/ConnectedPostsList';

const App = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%'
    }}>
      <ConnectedPostsList />
    </div>
  );
};

export { App }
