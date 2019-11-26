import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import history from '~/services/history';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { Container, ButtonSub } from './styles';

const schema = Yup.object().shape({
  placa: Yup.string().required('Campo obrigatório'),
  chassi: Yup.string().required('Campo obrigatório'),
  renavam: Yup.string().required('Campo obrigatório'),
  modelo: Yup.string().required('Campo obrigatório'),
  marca: Yup.string().required('Campo obrigatório'),
  ano: Yup.number().required('Campo obrigatório'),
});

export default function NewCar() {
  async function handleSubmit({ placa, chassi, renavam, modelo, marca, ano }) {
    try {
      await api.post('cars', {
        placa,
        chassi,
        renavam,
        modelo,
        marca,
        ano,
      });

      toast.success('Carro cadastrado com sucesso!');
      history.push('/');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="placa" placeholder="Placa Veículo" />
        <Input name="chassi" placeholder="Chassi Veículo" />
        <Input name="renavam" placeholder="Renavam Veículo" />
        <Input name="modelo" placeholder="Modelo Veículo" />
        <Input name="marca" placeholder="Marca Veículo" />
        <Input name="ano" placeholder="Ano Fabricação" />

        <ButtonSub type="submit">Cadastrar</ButtonSub>
      </Form>
    </Container>
  );
}
