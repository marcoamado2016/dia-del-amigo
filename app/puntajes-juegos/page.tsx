import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import {
    Box,
    Typography,
    Paper,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ColorServicio } from '../api/guardar-puntaje-color/guardar-color';

interface Team {
    name: string;
    colorName: string;
    hex: string;
    points: number;
    hasCrown?: boolean;
}



export default function PuntosJuegos() {
    const [teamsData, setTeamsData] = useState<Team[]>([]);
    useEffect(() => {
        const colores = new ColorServicio();
        colores
            .obtenerGanadorTodosLosJuegos()
            .then((data: any[]) => {
                console.log('data1234', data);
                setTeamsData(data.map((item) => {

                    let point = Math.max(item.puntoAmarillo, item.puntoAzul, item.puntoVerde, item.puntoRojo);
                    let color;
                    let name;
                   
                    if (point == item.puntoAmarillo) {
                        color = '#fbc02d';
                        name = 'AMARILLO';
                    
                    }
                    if (point == item.puntoAzul) {
                        color = '#1976d2';
                        name = 'AZUL';
                  
                    }
                    if (point == item.puntoVerde) {
                        color = '#2e7d32';
                        name = 'VERDE';
                     
                    }
                    if (point == item.puntoRojo) {
                        color = '#d32f2f';
                        name = 'ROJO';
                       
                    }
                    return {
                        name: item.juego,
                        colorName: name ?? "",
                        hex: color ?? "",
                        points: point,
                        hasCrown: true
                    }

                }
                )
                );
            })
            .catch((err) => {
                console.error(err);
            })
    }, [])
   
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
                    bgcolor: '#000d1d',
                    borderRadius: 4,
                    p: 3,
                }}
            >
                {teamsData.map((team, index) => (
                    <Box
                        key={team.name}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: 3,
                            py: 2.5,
                            // Línea divisoria sutil entre filas (excepto la última)
                            borderBottom: index < teamsData.length - 1 ? '1px solid #152232' : 'none',
                            '&:hover': {
                                bgcolor: team.hex, // Efecto hover sutil al pasar el cursor
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
                             {team.name}
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
                                color: '#eceff1'
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