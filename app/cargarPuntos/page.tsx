'use client';

import { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    MenuItem,
    Select,
    TextField,
    Button,
    Stack,
} from '@mui/material';
import { ColorServicio } from '../api/guardar-puntaje-color/guardar-color';

const teams = [
    { name: 'ROJO', color: '#e53935' },
    { name: 'AZUL', color: '#1e88e5' },
    { name: 'VERDE', color: '#43a047' },
    { name: 'AMARILLO', color: '#fdd835' },
];

export default function CargarResultados() {
    const [game, setGame] = useState('Juego 1');

    const [scores, setScores] = useState({
        ROJO: '',
        AZUL: '',
        VERDE: '',
        AMARILLO: '',
    });

    const handleChange = (team: string, value: string) => {
        console.log(`Score for ${team}: ${value}`);
        setScores({
            ...scores,
            [team]: value,
        });
    };

    const saveResults = async () => {
        console.log("scores", scores)
        console.log("game", game)
        let juegoParams = {
            juego: game,
            puntoRojo: scores.ROJO,
            puntoAzul: scores.AZUL,
            puntoVerde: scores.VERDE,
            puntoAmarillo: scores.AMARILLO,
        }
        const guardarColor = new ColorServicio();
        guardarColor.guardarColor(juegoParams)
            .then((response) => {
                console.log('Puntaje guardado exitosamente:', response);
            })
            .catch((error) => {
                console.error('Error guardando puntaje:', error);
            });
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: '#08121d',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 3,
            }}

        >
            <Paper
                sx={{
                    width: 650,
                    bgcolor: '#e2ebf5',
                    color: '#0f172a',
                    p: 4,
                    borderRadius: 4,
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        fontWeight: 'bold',
                        mb: 4,
                    }}
                >
                    CARGAR RESULTADOS
                </Typography>

                <Typography sx={{ mb: 1 }}>Seleccionar Juego</Typography>

                <Select
                    fullWidth
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                    sx={{ mb: 4, color: '#0f172a', '& .MuiSelect-icon': { color: '#0f172a' } }}
                >
                    <MenuItem value="La pasada de aros">La pasada de aros</MenuItem>
                    <MenuItem value="Pesca Milagrosa">Pesca Milagrosa</MenuItem>
                    <MenuItem value="Tatetí">Tatetí</MenuItem>
                    <MenuItem value="Versículo Fugaz">Versículo Fugaz</MenuItem>
                    <MenuItem value="Vóley">Vóley</MenuItem>
                    <MenuItem value="Pirámide de vasos">Pirámide de vasos</MenuItem>
                    <MenuItem value="Piedra, papel y tijera">Piedra, papel y tijera</MenuItem>
                    <MenuItem value="Elige la opción correcta">Elige la opción correcta</MenuItem>
                    <MenuItem value="Abecedario bíblico">Abecedario bíblico</MenuItem>
                </Select>

                <Stack spacing={3}>
                    {teams.map((team) => (
                        <Box
                            key={team.name}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 3,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 180,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: '50%',
                                        bgcolor: team.color,
                                    }}
                                />

                                <Typography sx={{ fontWeight: 'bold' }}>
                                    {team.name}
                                </Typography>
                            </Box>

                            <TextField
                                type="number"
                                value={scores[team.name as keyof typeof scores]}
                                onChange={(e) =>
                                    handleChange(team.name, e.target.value)
                                }
                                fullWidth
                                placeholder="0"
                                sx={{
                                    '& .MuiInputBase-input': {
                                        color: '#0f172a',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#cbd5e1',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#94a3b8',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#0f172a',
                                    },
                                }}
                            />
                        </Box>
                    ))}
                </Stack>

                <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{
                        mt: 5,
                        py: 1.8,
                        fontWeight: 'bold',
                        fontSize: 22,
                        bgcolor: '#2e7d32',
                        '&:hover': {
                            bgcolor: '#1b5e20',
                        },
                    }}

                    onClick={saveResults}
                >
                    GUARDAR RESULTADOS
                </Button>
            </Paper>
        </Box>
    );
}