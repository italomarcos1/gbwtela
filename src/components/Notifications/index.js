import React, { useState } from 'react';
import { MdNotifications } from 'react-icons/md';

import { Container, Badge } from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false); // se a list tá visível ou não

  // função no badge para show/hide na lista
  function handleToggleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={true}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>
    </Container>
  );
}
