import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"

const useCountry = (country) => {
  const [countryData, setCountryData] = useState(null)
  const [valData, setValData] = useState()

  const allUrl ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
  const valUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${country}.json`

  useEffect(() => {
    async function fetchAllCurrencies() {
      try {
        const response = await axios.get(allUrl)
        setCountryData(response.data)
        //console.log("all data",response.data)
      } catch (error) {
        console.error("Error fetching all currencies:", error);
      }
        
    }
    fetchAllCurrencies()
  },[])

  useEffect(() => {
    async function fetchCountryCurrency() {
      if(!country) return;
      //console.log(country)
      try {
        const response = await axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${country.trim()}.json`)
        setValData(response.data)
        //console.log("country data",response.data)
      } catch (error) {
        console.error("Error fetching selected country data:", error);
      }
    }
    fetchCountryCurrency()
  },[country])

  return{countryData, valData}
}

export default useCountry