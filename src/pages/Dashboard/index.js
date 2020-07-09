import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';
import { Container, Time } from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Dashboard() {
  const [schedule, setSchedule] = useState([
    {
      past: false,
      cancelable: true,
      id: 8,
      date: '2020-07-09T15:00:00.000Z',
      canceled_at: null,
      createdAt: '2020-07-09T10:30:46.286Z',
      updatedAt: '2020-07-09T10:30:46.286Z',
      user_id: 5,
      provider_id: 5,
      user: {
        name: 'Italo Marcos',
      },
    },
    {
      past: false,
      cancelable: true,
      id: 5,
      date: '2020-07-09T17:00:00.000Z',
      canceled_at: null,
      createdAt: '2020-07-09T10:30:38.677Z',
      updatedAt: '2020-07-09T10:30:38.677Z',
      user_id: 5,
      provider_id: 5,
      user: {
        name: 'Cliente 2',
      },
    },
    {
      past: false,
      cancelable: true,
      id: 6,
      date: '2020-07-09T18:00:00.000Z',
      canceled_at: null,
      createdAt: '2020-07-09T10:30:41.506Z',
      updatedAt: '2020-07-09T10:30:41.506Z',
      user_id: 5,
      provider_id: 5,
      user: {
        name: 'Cliente 3',
      },
    },
    {
      past: false,
      cancelable: true,
      id: 7,
      date: '2020-07-09T21:00:00.000Z',
      canceled_at: null,
      createdAt: '2020-07-09T10:30:44.141Z',
      updatedAt: '2020-07-09T10:30:44.141Z',
      user_id: 5,
      provider_id: 5,
      user: {
        name: 'Teste',
      },
    },
  ]);

  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadSchedule() {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map(hour => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: schedule.find(
            a => parseISO(a.date).toString() === compareDate.toString()
          ),
        };
      });

      setSchedule(data);
    }

    loadSchedule();
  }, []); //eslint-disable-line

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft size={36} color="FFF" onClick={handlePrevDay} />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button">
          <MdChevronRight size={36} color="FFF" onClick={handleNextDay} />
        </button>
      </header>

      <ul>
        {schedule.map(time => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.user.name : 'Em aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
