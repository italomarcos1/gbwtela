import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import socketio from 'socket.io-client';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false); // se a list tá visível ou não
  const [notifications, setNotifications] = useState([]);

  // ativa o badge apenas quando temos uma nova notificação
  const hasUnread = useMemo(
    () => !!notifications.find(notification => notification.read === false),
    [notifications]
  );
  // o !! substitui o casting booleano. se n achar a notf retorna false, se achar retorna true

  const user = useSelector(state => state.user.profile);

  const socket = useMemo(
    () =>
      socketio('http://localhost:3333', {
        query: {
          user_id: user.id,
        },
      }),
    [user]
  );

  useEffect(() => {
    socket.on('notification', notification => {
      setNotifications([notification, ...notifications]);
    });
  }, [socket, notifications]);

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');

      // formata para o timestamp
      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          // formata a distância
          parseISO(notification.createdAt), // recebe uma data
          new Date(), // data atual para ter referência
          { addSuffix: true, locale: pt } // objeto com configurações. mostra em PT-BR
        ),
      }));

      setNotifications(data); // atualiza o array de notifications com o que recebeu da API
    }

    loadNotifications(); // chamar o método após o hook
  }, []);

  // função no badge para show/hide na lista
  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`); // update da notificação na API

    // método para manipular o estado
    setNotifications(
      notifications.map(
        notification =>
          notification._id === id
            ? { ...notification, read: true } // retorna a notf com todos os objs e o read pra true
            : notification // senao for a notificação que queremos, apenas retorna
      )
    );
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>
      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && ( // mostra o 'marcar como lida' quando nao foi lida ainda
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
