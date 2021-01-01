import { features } from "../datajson/countries.json";
import legendItems from '../legendsData/LegendItems'

class LoadCountriesTasks {
    setState = null;
    mapCountries = features
    setWorldData = null
    setListCases = null
    setCasesType = null


    loadListRegion = (setListRegion) => {
        this.setListRegion = setListRegion
        fetch('https://disease.sh/v3/covid-19/countries')
            .then(res => res.json())
            .then(data => setListRegion(this.#sortList(data)))
    }

    #sortList = (data) => {
        const listSorted = [...data]
        listSorted.sort((a, b) => {
            return a.cases > b.cases ? -1 : 1
        })
        return listSorted;
    }

    loadWorldData = (setWorldData) => {
        this.setWorldData = setWorldData
        fetch('https://disease.sh/v3/covid-19/all')
            .then(res => res.json())
            .then(data => this.setWorldData(data))
    }

    load = (setState, casesType) => {
        this.setState = setState
        this.casesType = casesType
        console.log(this.casesType)
        fetch('https://disease.sh/v3/covid-19/countries')
            .then(res => res.json())
            .then(data => this.#processDataCovid(data))
            .catch(err => console.log(err))
    }

    #processDataCovid = (data) => {
        for (let i = 0; i < this.mapCountries.length; i++) {
            const mapCountry = this.mapCountries[i];
            const covidCountry = data.find(covidCountry => covidCountry.countryInfo.iso3 === mapCountry.properties.ISO_A3)

            if (covidCountry != null) {
                mapCountry.properties = covidCountry;

            }
            this.#setRegionColor(mapCountry)
        }
        this.setState(this.mapCountries)
    }

    #setRegionColor = (mapCountry) => {
        if (this.casesType === 'cases') {
            const item = legendItems[0].legends.find(item => item.isFor(mapCountry.properties.casesPerOneMillion))
            if (item !== null) {
                mapCountry.properties.color = item.color
            }
        }
    }


    loadCases = (setListCases) => {
        this.setListCases = setListCases
        fetch('https://disease.sh/v3/covid-19/countries')
            .then(res => res.json())
            .then(data => this.#processDataCovidCases(data))
            .catch(err => console.log(err))
    }

    #processDataCovidCases = (data) => {
        for (let i = 0; i < this.mapCountries.length; i++) {
            const mapCountry = this.mapCountries[i];
            const covidCountry = data.find(covidCountry => covidCountry.countryInfo.iso3 === mapCountry.properties.ISO_A3)

            if (covidCountry != null) {
                mapCountry.properties = covidCountry;
            }
        }

        this.#listCasesSorted(this.mapCountries)
    }

    #listCasesSorted = (mapCountries) => {
        const list = [...mapCountries]
        list.sort((a, b) => {
            return a.properties.casesPerOneMillion > b.properties.casesPerOneMillion ? -1 : 1
        })
        return this.setListCases(list)
    }


}

export default LoadCountriesTasks;