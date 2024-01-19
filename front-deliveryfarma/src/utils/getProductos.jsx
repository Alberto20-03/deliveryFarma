import { useEffect, useState } from 'react';
import { URL_APP } from '../constantes/const.js';

export function Data() {
  const [medicamentos, setMedicamentos] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${URL_APP}/productos`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await res.json();
      setMedicamentos(json);
    };

    fetchData();
  }, []);

  return medicamentos;
}
