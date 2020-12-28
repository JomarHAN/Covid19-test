import { features } from "../datajson/countries.json";

class LoadCountriesTasks {
    setState = null;
    mapCountries = features

    load = (setState) => {
        this.setState = setState

        fetch('https://disease.sh/v3/covid-19/countries')
            .then(res => res.json())
            .then(data => this.#processDataCovid(data))
            .catch(err => console.log(err))
    }

    #processDataCovid = (data) => {
        // console.log(data)
        // console.log(this.mapCountries)
        for (let i = 0; i < this.mapCountries.length; i++) {
            const mapCountry = this.mapCountries[i];
            const covidCountry = data.find(covidCountry => covidCountry.countryInfo.iso3 === mapCountry.properties.ISO_A3)

            mapCountry.properties.cases = "0"

            if (covidCountry != null) {
                mapCountry.properties = covidCountry
            }
        }
        this.setState(this.mapCountries)

    }
}

export default LoadCountriesTasks;