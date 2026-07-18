'use client';

import { Box } from '@mui/material';

export default function Cronograma() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#050a14',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
      }}
    >
      <Box
        component="img"
        src="/cronograma.png"
        alt="Cronograma del evento"
        sx={{
          width: '100%',
          maxWidth: 960,
          maxHeight: 'calc(100vh - 120px)',
          height: 'auto',
          objectFit: 'contain',
          display: 'block',
          borderRadius: 3,
          boxShadow: '0 30px 90px rgba(0,0,0,0.45)',
        }}
      />
    </Box>
  );
}
