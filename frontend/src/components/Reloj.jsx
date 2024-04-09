import React, { useState, useEffect } from "react";

function Reloj() {
  const [hora, setHora] = useState(new Date());

  const tick = () => {
    setHora(new Date());
  };

  useEffect(() => {
    const timerID = setInterval(tick, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const turno =
    hora.getHours() >= 19 || hora.getHours() < 7 ? "Noche" : "Mañana";
  const horaFormateada = hora.toLocaleTimeString();
  const fechaFormateada = hora.toLocaleDateString();

  return (
    <div className="dark:text-white text-gray-900 text-center font-bold">
      <div className="text-xl">{fechaFormateada}</div>
      <div className="text-xl">Turno {turno}</div>
      <div className="text-2xl">{horaFormateada}</div>
    </div>
  );
}

export default Reloj;
