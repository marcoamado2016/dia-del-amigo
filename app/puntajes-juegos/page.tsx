import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import {
    Box,
    Typography,
    Paper,
} from '@mui/material';

interface Team {
    name: string;
    colorName: string;
    hex: string;
    points: number;
    hasCrown?: boolean;
}

const teamsData: Team[] = [
    { name: 'ROJO', colorName: 'Rojo', hex: '#d32f2f', points: 120, hasCrown: true },
    { name: 'AZUL', colorName: 'Azul', hex: '#1976d2', points: 10 ,hasCrown: true},
    { name: 'VERDE', colorName: 'Verde', hex: '#2e7d32', points: 10,hasCrown: true },
    { name: 'AMARILLO', colorName: 'Amarillo', hex: '#fbc02d', points: 10, hasCrown: true },
];

export default function PuntosJuegos() {
    const rankedTeams = [...teamsData].sort((a, b) => b.points - a.points);
    return (
        <Box
            sx={{
                minHeight: '50vh',
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
                sx={{
                    fontWeight: 'bold',
                    letterSpacing: 1.5,
                    mb: 4
                }}

            >
                PUNTAJES DE  JUEGOS
            </Typography>
            <Paper
                sx={{
                    width: '100%',
                    maxWidth: 900,
                    bgcolor: '#023b81',
                    borderRadius: 4,
                    p: 3,
                }}
            >
                {rankedTeams.map((team, index) => (
                    <Box
                        key={team.name}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: 3,
                            py: 2.5,
                            // Línea divisoria sutil entre filas (excepto la última)
                            borderBottom: index < rankedTeams.length - 1 ? '1px solid #152232' : 'none',
                            '&:hover': {
                                bgcolor: '#111e2e', // Efecto hover sutil al pasar el cursor
                                cursor: 'pointer',
                            }
                        }}
                    >

                        <Typography
                            sx={{
                                fontSize: '1.1rem',
                                color: '#eceff1',
                                fontWeight: 500,
                                width: 90,
                            }}
                        >
                            Juego {index + 1}
                        </Typography>
                        <Typography
                            sx={{
                                width: 100,
                                color: team.hex,
                                fontWeight: 'bold',
                            }}
                        >
                            {team.colorName}
                        </Typography>
                        {team.hasCrown && (
                            <EmojiEventsIcon sx={{ color: '#fbc02d', fontSize: 24 }} />
                        )}
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