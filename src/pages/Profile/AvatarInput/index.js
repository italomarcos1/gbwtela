import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar'); // puxa o campo do redux

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    // permite o unform conseguir acessar a informação do input
    if (ref.current) {
      registerField({
        name: 'avatar_id', // valor do id
        ref: ref.current, // nome do input
        path: 'dataset.file', // puxar o data-file
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData(); // formato do multer

    data.append('file', e.target.files[0]); // nome usado no insomnia. retorna array mas usamos single element

    const response = await api.post('files', data); // envia pra api

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt=""
        />
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file} // guardar o novo id
          onChange={() => {}}
          ref={ref}
        />
      </label>
    </Container>
  );
}
