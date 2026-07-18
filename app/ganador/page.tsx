'use client';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useEffect, useState, useRef } from 'react';
import { ColorServicio } from '../api/guardar-puntaje-color/guardar-color';

interface Team {
  name: string;
  colorName: string;
  hex: string;
  points: number;
  asCrown?: boolean;
}

export default function TorneoColores() {
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [nombreJuego, setNombreJuego] = useState("");
  const [selectedGame, setSelectedGame] = useState('El juego del aro');
  const [totalJuegos, setTotalJuegos] = useState<Team[]>([]);
  useEffect(() => {
    setLoading(true);
    const colores = new ColorServicio();
    colores
      .obtenerGanadorTodosLosJuegos(selectedGame)
      .then((data) => {
        if (!data || data.length === 0) {
          setTeamsData([]);
          setNombreJuego(selectedGame);
          return;
        }

        const element = data[0];
        setNombreJuego(element.juego ?? selectedGame);

        const list: Team[] = [
          { points: element.puntoAmarillo ?? 0, hex: '#fbc02d', name: 'AMARILLO', colorName: 'Amarillo' },
          { points: element.puntoAzul ?? 0, hex: '#1976d2', name: 'AZUL', colorName: 'Azul' },
          { points: element.puntoVerde ?? 0, hex: '#2e7d32', name: 'VERDE', colorName: 'Verde' },
          { points: element.puntoRojo ?? 0, hex: '#d32f2f', name: 'ROJO', colorName: 'Rojo' },
        ];
        setTeamsData(list);
      })
      .catch((err) => {
        console.error(err);
        setTeamsData([]);
      })
      .finally(() => setLoading(false));
    let acumuladorRojo = 0;
    let acumuladorAmarillo = 0;
    let acumuladorVerde = 0;
    let acumualadorAzul = 0;
    colores
      .obtenerGanadorTodosLosJuegos()
      .then((data: any[]) => {
        for (const element of data) {
          acumuladorRojo = acumuladorRojo + element?.puntoRojo;
          acumualadorAzul = acumualadorAzul + element?.puntoAzul;
          acumuladorAmarillo = acumuladorAmarillo + element?.puntoAmarillo
          acumuladorVerde = acumuladorVerde + element?.puntoVerde;

        }
        const totalPuntos: Team[] = [
          { points: acumuladorAmarillo ?? 0, hex: '#fbc02d', name: 'AMARILLO', colorName: 'Amarillo' },
          { points: acumualadorAzul ?? 0, hex: '#1976d2', name: 'AZUL', colorName: 'Azul' },
          { points: acumuladorVerde ?? 0, hex: '#2e7d32', name: 'VERDE', colorName: 'Verde' },
          { points: acumuladorRojo ?? 0, hex: '#d32f2f', name: 'ROJO', colorName: 'Rojo' },
        ];
        setTotalJuegos(totalPuntos)
      })
      .catch((error) => {
        console.error(error);
        setTeamsData([]);
      })
  }, [selectedGame]);
  console.log("totalJuegos ",totalJuegos)
  const leader = teamsData.length ? teamsData.reduce((a, b) => (b.points > a.points ? b : a)) : undefined;
  const displayTeams = leader
    ? teamsData.map((team) => ({
      ...team,
      asCrown: team.name === leader.name,
    }))
    : teamsData;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0a1118',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 3,
        py: 6,

      }}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        {`${nombreJuego}`}
      </Typography>

      <FormControl sx={{ width: 240, mb: 3 }}>
        <InputLabel id="select-juego-label">Juego</InputLabel>
        <Select
          labelId="select-juego-label"
          value={selectedGame}
          label="Juego"
          onChange={(event) => setSelectedGame(event.target.value)}
          sx={{ bgcolor: '#0f1823', color: '#fff', borderRadius: 2 }}
        >
          {['El juego del aro', 'Elige la opción correcta', 'Vóley', 'Cruzando al otro lado', 'Pesca milagrosa'].map((juego, index) => {
            return (
              <MenuItem key={juego} value={juego}>
                {juego}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Typography variant="subtitle1" sx={{ color: '#90a4ae', mb: 4 }}>
        Resumen General
      </Typography>

      {loading && <LinearProgress sx={{ width: '100%', maxWidth: 900, mb: 2 }} />}

      <Grid container spacing={2} sx={{ maxWidth: 900, width: '100%', mb: 4 }}>
        {displayTeams.map((team, i) => (
          <Grid key={`${team.name}-${i}`}>
            <Card
              sx={{
                backgroundColor: team.hex,
                color: '#fff',
                borderRadius: 3,
                textAlign: 'center',
                position: 'relative',
                overflow: 'visible',
                boxShadow: 3,
                width: 200,
              }}
            >
              {team.asCrown && (
                <Box sx={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', bgcolor: '#FFD700', borderRadius: '50%', p: 0.5 }}>
                  <EmojiEventsIcon sx={{ color: '#000' }} />
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

      <Typography variant="subtitle2" sx={{ color: '#90a4ae', mb: 1, fontWeight: 'bold' }}>
        GANADOR
      </Typography>

      <Paper
        sx={{
          bgcolor: '#ffffff',
          border: `1px solid ${leader?.hex ?? '#4caf50'}`,
          borderRadius: 3,
          p: 2,
          width: '100%',
          maxWidth: 450,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4" sx={{ color: leader?.hex ?? '#4caf50', fontWeight: 'bold' }}>
          {leader?.name ?? '-'}
        </Typography>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6" sx={{ color: '#0a0a0a', lineHeight: 1, fontWeight: 'bold' }}>
            {leader?.points ?? 0}
          </Typography>

          <Typography variant="caption" sx={{ color: '#0a0a0a' }}>
            PUNTOS
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ width: '100%', maxWidth: 900, bgcolor: '#0c1622', borderRadius: 4, p: 3 }}>
        <Typography variant="h6" sx={{ color: '#fff', mb: 2, fontWeight: 'bold' }}>
          Total de puntajes en todos los juegos
        </Typography>

        {totalJuegos
          .slice()
          .sort((a, b) => b.points - a.points)
          .map((team) => (
            <Box key={team.name} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ color: '#fff', fontWeight: 'bold' }}>{team.name}</Typography>
                <Typography sx={{ color: '#fff', fontWeight: 'bold' }}>{team.points}</Typography>
              </Box>
              <Box sx={{ width: '100%', bgcolor: '#15212f', borderRadius: 2, overflow: 'hidden' }}>
                <Box
                  sx={{
                    width: `${Math.min(100, team.points * 1.5)}%`,
                    minWidth: '10px',
                    height: 12,
                    bgcolor: team.hex,
                  }}
                />
              </Box>
            </Box>
          ))}
      </Paper>
    </Box>
  );
}