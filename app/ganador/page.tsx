'use client';

import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  LinearProgress,
  Paper
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Tipado y datos del torneo
interface Team {
  name: string;
  colorName: string;
  hex: string;
  points: number;
  hasCrown?: boolean;
}

const teamsData: Team[] = [
  { name: 'ROJO', colorName: 'Rojo', hex: '#d32f2f', points: 120 },
  { name: 'AZUL', colorName: 'Azul', hex: '#1976d2', points: 95 },
  { name: 'VERDE', colorName: 'Verde', hex: '#2e7d32', points: 140, hasCrown: true },
  { name: 'AMARILLO', colorName: 'Amarillo', hex: '#fbc02d', points: 110 },
];

export default function TorneoColores() {
  // Ordenar equipos de mayor a menor puntuación para la sección de abajo
  const rankedTeams = [...teamsData].sort((a, b) => b.points - a.points);
  const leader = rankedTeams[0];
  const maxPoints = 150; // Límite máximo estimado para la barra de progreso

  return (
    <Box 
      sx={{ 
        backgroundColor: '#0a1118', 
        minHeight: '100vh', 
        color: '#fff', 
        py: 6, 
        px: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'sans-serif'
      }}
    >
      {/* Título Principal */}
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        TORNEO DE COLORES
      </Typography>
      
      <Typography 
        variant="subtitle1" 
        align="center"
        sx={{ color: '#90a4ae', mb: 4 }} 
      >
        Resumen General
      </Typography>

      {/* 1. Tarjetas Superiores (4 Cards) */}
      <Grid container spacing={2} sx={{ width: '100%', maxWidth: 900, mb: 4 }}>
        {teamsData.map((team) => (
          <Grid key={team.name}>
            <Card 
              sx={{ 
                backgroundColor: team.hex, 
                color: '#fff', 
                borderRadius: 3,
                textAlign: 'center',
                position: 'relative',
                overflow: 'visible', // Permite que la corona sobresalga
                boxShadow: 3
              }}
            >
              {/* Corona sobre el líder */}
              {team.hasCrown && (
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: -20, 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    zIndex: 2,
                    backgroundColor: '#ffd700',
                    borderRadius: '50%',
                    p: 0.5,
                    boxShadow: '0px 4px 10px rgba(255, 215, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <EmojiEventsIcon sx={{ color: '#000', fontSize: 24 }} />
                </Box>
              )}
              
              <CardContent sx={{ py: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', letterSpacing: 1.2, opacity: 0.9 }}>
                  {team.name}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', my: 1 }}>
                  {team.points}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  pts
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 2. Sección Líder General */}
      <Typography variant="subtitle2" sx={{ color: '#90a4ae', mb: 1, letterSpacing: 1, fontWeight: 'bold' }}>
        LÍDER GENERAL
      </Typography>
      
      <Paper 
        elevation={0}
        sx={{ 
          backgroundColor: '#072016', 
          border: '1px solid #1b5e20',
          borderRadius: 3,
          width: '100%',
          maxWidth: 450,
          p: 2,
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" sx={{ color: '#4caf50', letterSpacing: 2, fontWeight: 'black' }}>
          {leader.name}
        </Typography>
        <Box  sx={{ textAlign: 'right' }}>
          <Typography variant="h6" sx={{ color: '#fff', lineHeight: 1, fontWeight: 'bold' }}>
            {leader.points}
          </Typography>
          <Typography variant="caption" sx={{ color: '#90a4ae' }}>
            PUNTOS
          </Typography>
        </Box>
      </Paper>

      {/* 3. Panel de Progreso / Listado (Bottom Chart) */}
      <Paper 
        elevation={4}
        sx={{ 
          backgroundColor: '#0c1622', 
          borderRadius: 4, 
          width: '100%', 
          maxWidth: 900,
          p: 3,
          border: '1px solid #1a2c3d'
        }}
      >
        {rankedTeams.map((team) => (
          <Box 
            key={team.name} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2.5,
              '&:last-child': { mb: 0 } 
            }}
          >
            {/* Nombre del equipo */}
            <Typography sx={{ width: 100, color: '#90a4ae', fontWeight: 'bold' }}>
              {team.colorName}
            </Typography>
            
            {/* Barra de Progreso */}
            <Box sx={{ flexGrow: 1, mx: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={(team.points / maxPoints) * 100} 
                sx={{
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: '#152232',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: team.hex,
                    borderRadius: 7,
                  }
                }}
              />
            </Box>

            {/* Puntos de la barra */}
            <Typography sx={{ width: 40, textAlign: 'right', fontWeight: 'bold' }}>
              {team.points}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}