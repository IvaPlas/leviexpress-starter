import React, { useEffect, useState } from 'react';
import mapImage from './img/map.svg';
import './style.css';

const DateOptions = ({ dates }) => {
  return (
    <>
      <option value="">Vyberte</option>
      {dates.map((date) => {
        return (
          <option key={date.dateBasic} value={date.dateBasic}>
            {date.dateCs}
          </option>
        );
      })}
    </>
  );
};

const CityOptions = ({ cities }) => {
  return (
    <>
      <option value="">Vyberte</option>
      {cities.map((city) => {
        return (
          <option key={city.code} value={city.code}>
            {city.name}
          </option>
        );
      })}

      {/* <option value="">Vyberte</option>
      <option value="mesto01">Město 01</option>
      <option value="mesto02">Město 02</option>
      <option value="mesto03">Město 03</option>
      <option value="mesto04">Město 04</option>
      <option value="mesto05">Město 05</option> */}
    </>
  );
};

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([
    {
      dateBasic: '28.05.2021',
      dateCs: 'pá 28. květen 2021',
    },
    {
      dateBasic: '29.05.2021',
      dateCs: 'so 29. květen 2021',
    },
  ]);

  useEffect(() => {
    fetch(`https://apps.kodim.cz/daweb/leviexpress/api/dates`)
      .then((response) => response.json())
      .then((data) => setDates(data.results));
  }, []);

  useEffect(() => {
    fetch(`https://apps.kodim.cz/daweb/leviexpress/api/cities`)
      .then((response) => response.json())
      .then((data) => setCities(data.results));
  }, []);

  console.log(date);
  const handleSubmit = (event) => {
    event.preventDefault();
    return console.log('Odesílám formulář s cestou');
  };
  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form onSubmit={handleSubmit} className="journey-picker__form">
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select onChange={(e) => setFromCity(e.target.value)}>
              value={fromCity}
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select onChange={(e) => setToCity(e.target.value)} value={toCity}>
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select onChange={(e) => setDate(e.target.value)} value={date}>
              <DateOptions dates={dates} />
              {/* <option value="">Vyberte</option>
              <option value="datum01">Datum 01</option>
              <option value="datum02">Datum 02</option>
              <option value="datum03">Datum 03</option>
              <option value="datum04">Datum 04</option>
              <option value="datum05">Datum 05</option> */}
            </select>
          </label>
          <div className="journey-picker__controls">
            <button className="btn" type="submit">
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src={mapImage} />
      </div>
    </div>
  );
};
