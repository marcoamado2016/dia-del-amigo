'use client';
import { useState } from 'react';
import CargarResultados from './cargarPuntos/page';
import CampeonTorneo from './copa/page';
import TorneoColores from './ganador/page';
import PuntosJuegos from './puntajes-juegos/page';
import { Box, Button, ButtonGroup } from '@mui/material';

export default function Home() {
  const [view, setView] = useState<'puntos' | 'ganador' | 'copa' | 'cargar'>('puntos');

  const renderView = () => {
    switch (view) {
      case 'ganador':
        return <TorneoColores />;
      case 'copa':
        return <CampeonTorneo />;
      case 'cargar':
        return <CargarResultados />;
      default:
        return <PuntosJuegos />;
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-zinc-50 font-sans dark:bg-black min-h-screen py-6">
      <Box sx={{ mb: 3 }}>
        <ButtonGroup variant="contained" aria-label="navegacion-juegos">
          <Button onClick={() => setView('puntos')}>Puntos</Button>
          <Button onClick={() => setView('ganador')}>Ganador</Button>
          <Button onClick={() => setView('copa')}>Copa</Button>
          <Button onClick={() => setView('cargar')}>Cargar</Button>
        </ButtonGroup>
      </Box>

      <Box sx={{ width: '100%', maxWidth: 1200 }}>{renderView()}</Box>
    </div>
  );
}
