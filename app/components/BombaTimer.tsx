'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField } from '@mui/material';

const INITIAL_TIME = 60;
const PRESET_OPTIONS = [
  { label: '1 min', value: 60 },
  { label: '1 min 30 seg', value: 90 },
  { label: '2 min', value: 120 },
];

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default function BombaTimer() {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [selectedMinutes, setSelectedMinutes] = useState(1);
  const [selectedSeconds, setSelectedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasExploded, setHasExploded] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    if (timeLeft <= 0) {
      setHasExploded(true);
      setIsRunning(false);
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    const totalSeconds = selectedMinutes * 60 + selectedSeconds;
    setHasExploded(false);
    setTimeLeft(totalSeconds);
    setIsRunning(true);
  };

  const resetTimer = () => {
    const totalSeconds = selectedMinutes * 60 + selectedSeconds;
    setHasExploded(false);
    setIsRunning(false);
    setTimeLeft(totalSeconds);
  };

  const handlePresetSelect = (minutes: number, seconds: number) => {
    setSelectedMinutes(minutes);
    setSelectedSeconds(seconds);
    setTimeLeft(minutes * 60 + seconds);
    setHasExploded(false);
    setIsRunning(false);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        width: '100%',
        maxWidth: 420,
        mx: 'auto',
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        background: 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(51,65,85,0.9))',
        border: '1px solid rgba(248,113,113,0.35)',
        boxShadow: '0 25px 50px rgba(2, 6, 23, 0.35)',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5 }}>
        <Box component="h5" sx={{ m: 0, fontSize: '1.25rem', fontWeight: 700, color: '#fff7ed' }}>
          Temporizador
        </Box>
        <Box component="p" sx={{ m: 0, fontSize: '0.95rem', color: '#cbd5e1', textAlign: 'center' }}>
          Elige el tiempo antes de activarlo
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
          {PRESET_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={selectedMinutes * 60 + selectedSeconds === option.value ? 'contained' : 'outlined'}
              color="warning"
              size="small"
              onClick={() => handlePresetSelect(Math.floor(option.value / 60), option.value % 60)}
            >
              {option.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
          <TextField
            label="Minutos"
            type="number"
            value={selectedMinutes}
            onChange={(event) => {
              const value = Number(event.target.value);
              if (!Number.isNaN(value) && value >= 0) {
                setSelectedMinutes(value);
                setTimeLeft(value * 60 + selectedSeconds);
                setHasExploded(false);
                setIsRunning(false);
              }
            }}
            slotProps={{ input: { inputProps: { min: 0 } } }}
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: 'rgba(248, 113, 113, 0.35)' },
              },
              '& .MuiInputLabel-root': { color: '#cbd5e1' },
            }}
          />
          <TextField
            label="Segundos"
            type="number"
            value={selectedSeconds}
            onChange={(event) => {
              const value = Number(event.target.value);
              if (!Number.isNaN(value) && value >= 0) {
                setSelectedSeconds(value);
                setTimeLeft(selectedMinutes * 60 + value);
                setHasExploded(false);
                setIsRunning(false);
              }
            }}
            slotProps={{ input: { inputProps: { min: 0, max: 59 } } }}
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: 'rgba(248, 113, 113, 0.35)' },
              },
              '& .MuiInputLabel-root': { color: '#cbd5e1' },
            }}
          />
        </Box>

        <Box
          className={`bomb-stage ${hasExploded ? 'is-exploded' : isRunning ? 'is-running' : 'is-idle'}`}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: hasExploded
              ? 'radial-gradient(circle, rgba(254, 240, 138, 0.45) 0%, rgba(249, 115, 22, 0.25) 45%, rgba(127, 29, 29, 0.15) 100%)'
              : 'radial-gradient(circle, rgba(15, 23, 42, 0.95) 0%, rgba(2, 6, 23, 0.95) 100%)',
            border: hasExploded ? '2px solid rgba(254, 240, 138, 0.85)' : '2px solid rgba(248, 113, 113, 0.4)',
            transition: 'all 0.3s ease',
          }}
        >
          {hasExploded ? (
            <Box className="explosion" sx={{ position: 'relative', width: 140, height: 140 }}>
              <Box
                className="explosion-core"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #fef3c7 0%, #fb923c 40%, #dc2626 100%)',
                  boxShadow: '0 0 40px rgba(251, 146, 60, 0.75)',
                }}
              />
              <Box className="explosion-ray ray-1" />
              <Box className="explosion-ray ray-2" />
              <Box className="explosion-ray ray-3" />
              <Box className="explosion-ray ray-4" />
            </Box>
          ) : (
            <Box className="bomb-illustration" sx={{ position: 'relative', width: 120, height: 140 }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 18,
                  left: 24,
                  width: 72,
                  height: 72,
                  borderRadius: '40% 40% 48% 48%',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 70%, #64748b 100%)',
                  border: '4px solid #475569',
                  boxShadow: 'inset -6px -8px 0 rgba(15,23,42,0.25)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 42,
                  width: 36,
                  height: 28,
                  borderRadius: '12px 12px 8px 8px',
                  background: '#0f172a',
                  border: '3px solid #e2e8f0',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 6,
                  left: 24,
                  width: 72,
                  height: 18,
                  borderRadius: '999px',
                  background: 'linear-gradient(90deg, #fb923c, #dc2626)',
                  boxShadow: '0 0 12px rgba(248, 113, 113, 0.5)',
                }}
              />
            </Box>
          )}
        </Box>

        <Box component="h2" sx={{ m: 0, fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: 800, color: '#fef2f2', letterSpacing: 1.6 }}>
          {formatTime(timeLeft)}
        </Box>

        <Box component="p" sx={{ m: 0, fontSize: '1rem', color: hasExploded ? '#fde68a' : '#e2e8f0', fontWeight: 600 }}>
          {hasExploded ? 'se terminó el tiempo' : isRunning ? 'El juego comenzó.' : 'Lista para iniciar.'}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, width: '100%' }}>
          <Button variant="contained" color="error" fullWidth onClick={startTimer}>
            {isRunning ? 'Reiniciar cuenta' : 'Iniciar Juego'}
          </Button>
          <Button variant="outlined" fullWidth onClick={resetTimer}>
            Reiniciar
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
