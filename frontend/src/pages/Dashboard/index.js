import React, { useEffect, useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Container, Meet } from './styles';

export default function Dashboard() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function loadCars() {
      const response = await api.get('cars');
      setCars(response.data);
    }
    loadCars();
  }, []);

  return (
    <Container>
      <div>
        <h2>Controle de Carros</h2>
        <Link to="/newcar">
          <button type="submit">Novo Carro</button>
        </Link>
      </div>

      <ul>
        {cars.map(car => (
          <Link to={`/editorcar?id=${car.id}`} key={car.id}>
            <Meet>
              <strong>{`Carro (Marca e Modelo): ${car.marca} - ${car.modelo}`}</strong>
              <div>
                <span>Detalhes</span>
                <MdChevronRight size={30} color="#fff" />
              </div>
            </Meet>
          </Link>
        ))}
      </ul>
    </Container>
  );
}
