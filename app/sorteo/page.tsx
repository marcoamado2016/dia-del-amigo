'use client';

import { Box, Paper, Typography } from '@mui/material';

export default function SorteoDiaDelAmigo() {
  return (
    <Box
      sx={{
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        py: 6,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 480,
          borderRadius: 4,
          p: { xs: 3, md: 4 },
          bgcolor: '#0f172a',
          border: '1px solid rgba(250, 204, 21, 0.3)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ color: '#fef3c7', fontWeight: 700, mb: 2 }}>
          Ganador del sorteo
        </Typography>

        <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800, mb: 2 }}>
          Mario Pacheco
        </Typography>

        <Typography variant="h6" sx={{ color: '#cbd5e1' }}>
          Número de sorteo: 0002
        </Typography>
      </Paper>
    </Box>
  );
}
