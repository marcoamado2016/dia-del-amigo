import axios from 'axios';

export class ColorServicio {
    async guardarColor(colorData: any): Promise<any> {
        try {
            console.log('colorData', colorData);
            const response = await axios.post('/api/guardar-puntaje-color', colorData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error guardando color:', error);
            throw error;
        }
    }
    async obtenerGanadorTodosLosJuegos(juego?: string): Promise<any> {
        try {
            console.log("OLAAAA")
            let url = '/api/obtener-ganador-todos-los-juegos';
            if (juego) {
                url += `?juego=${encodeURIComponent(juego)}`;
            }
            console.log("URL ", url);
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error obteniendo ganador de todos los juegos:', error);
            throw error;
        }
    }
}
