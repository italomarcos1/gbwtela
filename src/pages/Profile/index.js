import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
  const profile = {
    id: 3,
    name: 'Anakin Skywalker',
    email: 'italomarcos0010@gmail.com',
  };

  return (
    <Container>
      <Form initialData={profile} onSubmit={() => {}}>
        <AvatarInput name="avatar_id" />
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu endereço de email" />

        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Sua senha atual"
        />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
        />

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="button" onClick={() => {}}>
        Sair do GoBarber
      </button>
    </Container>
  );
}
