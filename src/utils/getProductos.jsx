import { useEffect, useState } from 'react';

export function Data() {
  const [medicamentos, setMedicamentos] = useState(undefined);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3100/productos', {
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
