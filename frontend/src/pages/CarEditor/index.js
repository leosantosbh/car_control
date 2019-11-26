import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import history from '~/services/history';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { Container, ButtonSub, ButtonRemove } from './styles';

const schema = Yup.object().shape({
  placa: Yup.string().required('Campo obrigatório'),
  chassi: Yup.string().required('Campo obrigatório'),
  renavam: Yup.string().required('Campo obrigatório'),
  modelo: Yup.string().required('Campo obrigatório'),
  marca: Yup.string().required('Campo obrigatório'),
  ano: Yup.number().required('Campo obrigatório'),
});

export default function NewCar(req) {
  const id = req.location.search.substring(
    req.location.search.lastIndexOf('=') + 1
  );

  const [car, setCar] = useState({});

  async function handleSubmit({ placa, chassi, renavam, modelo, marca, ano }) {
    try {
      await api.put(`cars/${id}`, {
        placa,
        chassi,
        renavam,
        modelo,
        marca,
        ano,
      });

      toast.success('Carro Atualizado com sucesso!');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  async function handleRemove() {
    api.delete(`cars/${id}`);
    toast.success('Carro removido com sucesso!');
    history.push('/');
  }

  useEffect(() => {
    async function getCar() {
      const response = await api.get(`cars?id=${id}`);
      setCar(response.data);
    }
    getCar();
  }, [id]);

  console.log(car);

  return (
    <Container>
      <Form initialData={car} schema={schema} onSubmit={handleSubmit}>
        <Input name="placa" placeholder="Placa Veículo" />
        <Input name="chassi" placeholder="Chassi Veículo" />
        <Input name="renavam" placeholder="Renavam Veículo" />
        <Input name="modelo" placeholder="Modelo Veículo" />
        <Input name="marca" placeholder="Marca Veículo" />
        <Input name="ano" placeholder="Ano Fabricação" />
        <ButtonSub type="submit">Salvar</ButtonSub>
      </Form>
      <ButtonRemove type="submit" onClick={handleRemove}>
        Remover
      </ButtonRemove>
    </Container>
  );
}
