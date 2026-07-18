'use client';
import { useState } from 'react';
import CargarResultados from './cargarPuntos/page';
import CampeonTorneo from './copa/page';
import TorneoColores from './ganador/page';
import PuntosJuegos from './puntajes-juegos/page';
import Cronograma from './cronograma/page';
import BombaTimer from './components/BombaTimer';
import SorteoDiaDelAmigo from './sorteo/page';
import { Box, Button, ButtonGroup } from '@mui/material';

export default function Home() {
  const [view, setView] = useState<'puntos' | 'ganador' | 'copa' | 'cargar' | 'cronograma' | 'bomba' | 'sorteo'>('puntos');

  const renderView = () => {
    switch (view) {
      case 'ganador':
        return <TorneoColores />;
      case 'copa':
        return <CampeonTorneo />;
      case 'cargar':
        return <CargarResultados />;
      case 'cronograma':
        return <Cronograma />;
      case 'bomba':
        return <BombaTimer />;
      case 'sorteo':
        return <SorteoDiaDelAmigo />;
      default:
        return <PuntosJuegos />;
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-[#050a14] text-white min-h-screen py-6">
      <Box sx={{ mb: 3 }}>
        <ButtonGroup variant="contained" aria-label="navegacion-juegos">
          <Button onClick={() => setView('puntos')}>Tabla de ganadores</Button>
          <Button onClick={() => setView('ganador')}>Puestos de colores</Button>
          <Button onClick={() => setView('copa')}>Ganador</Button>
          <Button onClick={() => setView('cargar')}>Cargar</Button>
          <Button onClick={() => setView('cronograma')}>Cronograma</Button>
          <Button onClick={() => setView('bomba')}>Cronometro</Button>
          <Button onClick={() => setView('sorteo')}>Sorteo</Button>
        </ButtonGroup>
      </Box>

      <Box sx={{ width: '100%', maxWidth: 1200 }}>{renderView()}</Box>
    </div>
  );
}
