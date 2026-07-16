'use client';

import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { ColorServicio } from '../api/guardar-puntaje-color/guardar-color';

// Datos del campeón
const championData = {
  name: 'VERDE',
  hex: '#2e7d32',
  points: 680,
};

// Colores del confeti
const confettiColors = [
  '#fbc02d',
  '#d32f2f',
  '#ff9800',
  '#2e7d32',
  '#0288d1',
];

interface ConfettiParticle {
  id: number;
  top: string;
  left: string;
  color: string;
  size: number;
  rotation: string;
}

export default function CampeonTorneo() {
  const [confettiParticles, setConfettiParticles] = useState<
    ConfettiParticle[]
  >([]);
  const [ganador, setGanador] = useState<{ name: string; points: number; hex: string } | null>(null);

  useEffect(() => {
    const particles = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      color:
        confettiColors[
        Math.floor(Math.random() * confettiColors.length)
        ],
      size: Math.random() * 6 + 4,
      rotation: `${Math.random() * 360}deg`,
    }));

    setConfettiParticles(particles);
    const colores = new ColorServicio();
    colores
      .obtenerGanadorTodosLosJuegos()
      .then((data) => {
        let sumadoAzul = 0;
        let sumadoRojo = 0;
        let sumadoVerde = 0;
        let sumadoAmarillo = 0;
        for (const item of data) {
          sumadoAzul += Number(item.puntoAzul) ?? 0;
          sumadoRojo += Number(item.puntoRojo) ?? 0;
          sumadoVerde += Number(item.puntoVerde) ?? 0;
          sumadoAmarillo += Number(item.puntoAmarillo) ?? 0;
        }

        const totals = [
          { name: 'AZUL', points: sumadoAzul, hex: '#0288d1' },
          { name: 'ROJO', points: sumadoRojo, hex: '#d32f2f' },
          { name: 'VERDE', points: sumadoVerde, hex: '#2e7d32' },
          { name: 'AMARILLO', points: sumadoAmarillo, hex: '#fbc02d' },
        ];
        let mayorPunto = 0;
        for (const item of totals) {

          if (item.points > mayorPunto) {
            mayorPunto = item.points;
            setGanador(item);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });

  }, []);
console.log('ganador', ganador);
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        background: 'radial-gradient(circle, #092c1a 0%, #050a0e 100%)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        overflow: 'hidden',
      }}
    >
      {/* Confeti */}
      {confettiParticles.map((p) => (
        <Box
          key={p.id}
          sx={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: p.size * 1.6,
            height: p.size,
            bgcolor: p.color,
            transform: `rotate(${p.rotation})`,
            borderRadius: '2px',
            opacity: 0.8,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Trofeo */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: 150,
            height: 150,
            borderRadius: '50%',
            backgroundColor: 'rgba(251,192,45,0.2)',
            filter: 'blur(40px)',
            zIndex: 1,
          }}
        />

        <EmojiEventsIcon
          sx={{
            fontSize: 140,
            color: '#fbc02d',
            filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.5))',
            zIndex: 2,
          }}
        />
      </Box>

      {/* Título */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          letterSpacing: 2,
          textTransform: 'uppercase',
          mb: 1,
          fontSize: { xs: '1.2rem', sm: '1.5rem' },
          textShadow: '0 2px 4px rgba(0,0,0,.5)',
          zIndex: 2,
        }}
      >
        ¡Campeón del Del amigo!
      </Typography>

      {/* Nombre */}
      <Typography
        variant="h1"
        sx={{
          fontWeight: 900,
          color: ganador?.hex,
          fontSize: { xs: '4rem', sm: '6rem' },
          letterSpacing: 3,
          textTransform: 'uppercase',
          mb: 3,
          textShadow: '0 4px 12px rgba(0,0,0,.6)',
          zIndex: 2,
        }}
      >
        {ganador?.name}
      </Typography>

      {/* Puntos */}
      <Box
        sx={{
          border: `2px solid ${ganador?.hex ?? championData.hex}`,
          borderRadius: 10,
          px: 6,
          py: 1.5,
          backgroundColor: 'rgba(0,0,0,.3)',
          boxShadow: '0 4px 10px rgba(0,0,0,.3)',
          zIndex: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            letterSpacing: 1.5,
            fontSize: { xs: '1.3rem', sm: '1.6rem' },
          }}
        >
          {ganador?.points ?? championData.points} PUNTOS
        </Typography>
      </Box>
    </Box>
  );
}