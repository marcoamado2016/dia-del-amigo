import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Paper,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useEffect, useState, useRef } from 'react';
import { ColorServicio } from '../api/guardar-puntaje-color/guardar-color';

interface Team {
  name: string;
  colorName: string;
  hex: string;
  points: number;
  hasCrown?: boolean;
}

export default function TorneoColores() {
  const [teamsData, setTeamsData] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [nombreJuego, setNombreJuego] = useState(); // Cambia esto según el juego que quieras consultar
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    const colores = new ColorServicio();
    colores
      .obtenerGanadorTodosLosJuegos("Juego 1")
      .then((data) => {
        console.log('data', data);
        
        const list: Team[] = [];
        for (const element of data) {
          setNombreJuego(element.juego);
          console.log('element', element);
          list.push({ points: element.puntoAmarillo ?? 0, hex: '#fbc02d', name: 'AMARILLO', colorName: 'Amarillo' });
          list.push({ points: element.puntoAzul ?? 0, hex: '#1976d2', name: 'AZUL', colorName: 'Azul' });
          list.push({ points: element.puntoVerde ?? 0, hex: '#2e7d32', name: 'VERDE', colorName: 'Verde' });
          list.push({ points: element.puntoRojo ?? 0, hex: '#d32f2f', name: 'ROJO', colorName: 'Rojo' });
        }
        setTeamsData(list);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const leader = teamsData.length ? teamsData.reduce((a, b) => (b.points > a.points ? b : a)) : undefined;

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
        {nombreJuego}
      </Typography>

      <Typography variant="subtitle1" sx={{ color: '#90a4ae', mb: 4 }}>
        {`Resumen General de Puntajes por Color`}
      </Typography>

      {loading && <LinearProgress sx={{ width: '100%', maxWidth: 900, mb: 2 }} />}

      <Grid container spacing={2} sx={{ maxWidth: 900, width: '100%', mb: 4 }}>
        {teamsData.map((team, i) => (
          <Grid key={team.name}>
            <Card
              sx={{
                backgroundColor: team.hex,
                color: '#fff',
                borderRadius: 3,
                textAlign: 'center',
                position: 'relative',
                overflow: 'visible',
                boxShadow: 3,
              }}
            >
              {team.hasCrown && (
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
        LÍDER GENERAL
      </Typography>

      <Paper
        sx={{
          bgcolor: '#072016',
          border: '1px solid #1b5e20',
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
        <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
          {leader?.name ?? '-'}
        </Typography>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6" sx={{ color: '#fff', lineHeight: 1, fontWeight: 'bold' }}>
            {leader?.points ?? 0}
          </Typography>

          <Typography variant="caption" sx={{ color: '#90a4ae' }}>
            PUNTOS
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ width: '100%', maxWidth: 900, bgcolor: '#0c1622', borderRadius: 4, p: 3 }}></Paper>
    </Box>
  );
}