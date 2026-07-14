 
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

interface Team {
  name: string;
  colorName: string;
  hex: string;
  points: number;
  hasCrown?: boolean;
}

const teamsData: Team[] = [
  { name: 'ROJO', colorName: 'Rojo', hex: '#d32f2f', points: 120 , hasCrown: true},
  { name: 'AZUL', colorName: 'Azul', hex: '#1976d2', points: 10 },
  { name: 'VERDE', colorName: 'Verde', hex: '#2e7d32', points: 10,  },
  { name: 'AMARILLO', colorName: 'Amarillo', hex: '#fbc02d', points: 10 },
];

export default function TorneoColores() {
  const rankedTeams = [...teamsData].sort((a, b) => b.points - a.points);
  const leader = rankedTeams[0];
  const maxPoints = 150;

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
        sx={{
          color: '#90a4ae',
          mb: 4,
        }}
      >
        Resumen General
      </Typography>

      {/* Cards */}
      <Grid container spacing={2} sx={{ maxWidth: 900, width: '100%', mb: 4 }}>
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
              {team.hasCrown && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -18,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: '#FFD700',
                    borderRadius: '50%',
                    p: 0.5,
                  }}
                >
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

      <Typography
        variant="subtitle2"
        sx={{
          color: '#90a4ae',
          mb: 1,
          fontWeight: 'bold',
        }}
      >
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
        <Typography
          variant="h4"
          sx={{
            color: '#4caf50',
            fontWeight: 'bold',
          }}
        >
          {leader.name}
        </Typography>
        <Box sx={{ textAlign: 'right' }}>

          <Typography variant="h6" sx={{ color: '#fff', lineHeight: 1, fontWeight: 'bold' }}>

            {leader.points}

          </Typography>

          <Typography variant="caption" sx={{ color: '#90a4ae' }}>

            PUNTOS

          </Typography>

        </Box>
      </Paper>

      <Paper
        sx={{
          width: '100%',
          maxWidth: 900,
          bgcolor: '#0c1622',
          borderRadius: 4,
          p: 3,
        }}
      >
        {rankedTeams.map((team) => (
          <Box
            key={team.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography
              sx={{
                width: 100,
                color: '#90a4ae',
                fontWeight: 'bold',
              }}
            >
              {team.colorName}
            </Typography>

            <Box sx={{ flex: 1, mx: 2 }}>
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
                  },
                }}
              />
            </Box>

            <Typography
              sx={{
                width: 40,
                textAlign: 'right',
                fontWeight: 'bold',
              }}
            >
              {team.points}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}