'use client';

import React from 'react';
import Box from './components/Sidebar/Box';

const error = () => {
  return (
    <Box className='h-full flex items-center justify-center'>
      <div className='text-neutral-400'>Something Went Wrong</div>
    </Box>
  );
};

export default error;
