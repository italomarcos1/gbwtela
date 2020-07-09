import React, { useRef } from 'react';

import { Container } from './styles';

export default function AvatarInput() {
  const file = 63;
  const preview = 'https://api.adorable.io/avatars/120/abott@adorable.png';

  const ref = useRef();

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
