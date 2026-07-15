'use client';
import CargarResultados from './cargarPuntos/page';
import CampeonTorneo from './copa/page';
import TorneoColores from './ganador/page';
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      <TorneoColores/>

    </div>
  );
}
