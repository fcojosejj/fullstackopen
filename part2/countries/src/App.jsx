import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [countryList, setCountryList] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase() || country.name.official.toLowerCase().includes(search.toLowerCase())))
    setCountryList(filteredCountries)
  }, [search, countries])

  useEffect(() => {
    if (countryList.length === 1) {
      setLoading(true)
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${countryList[0].latlng[0]}&longitude=${countryList[0].latlng[1]}&hourly=temperature_2m`)
        .then(response => {
          setWeather(response.data)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [countryList])

  return (
    <>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
        {countryList.length === 0 && <p>No countries found</p>}
        {countryList.length > 10 && <p>Too many countries found</p>}
        {(countryList.length > 1 && countryList.length < 10) &&
          <ul>
            {countryList.map(country =>
              <>
                <li key={country.name.common}>{country.name.common}</li> <button onClick={() => setCountryList(countries.filter(c => country.name.common === c.name.common))}>show</button>
              </>
            )}
          </ul>
        }
        {countryList.length === 1 &&
          <div>
            <h2>{countryList[0].name.common}</h2>
            <p>Official name: {countryList[0].name.official}</p>
            <p>Capital: {countryList[0].capital}</p>
            <p>Area: {countryList[0].area}</p>
            <p>Population: {countryList[0].population}</p>
            <img src={countryList[0].flags.png} alt="flag" />
            {loading ? <p>Loading...</p> : weather.hourly ? (
              <div>
                <h3>Weather in {countryList[0].capital}</h3>
                <p>Temperature: {weather.hourly.temperature_2m[new Date().getHours()]}°C</p>
              </div>
            ) : <p>No weather data</p>}
          </div>
        }
      </div>
    </>
  )
}

export default App
