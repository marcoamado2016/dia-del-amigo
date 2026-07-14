'use client';
import TorneoDashboard from './ganador/page';
import PuntosJuegos from './puntajes-juegos/page';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
  
        <PuntosJuegos />
      
    </div>
  );
}
