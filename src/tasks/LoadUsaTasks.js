import { features } from '../datajson/us-states.json'
import { legendStates } from '../legendsData/LegendItems'
class LoadUsaTasks {
    mapUsStates = features
    setUsState = null

    loadListTable = (setListRegion) => {
        fetch('https://disease.sh/v3/covid-19/states')
            .then(res => res.json())
            .then(data => {
                const listSorted = this.#sortStatesList(data);
                setListRegion(listSorted)
            })
    }
    #sortStatesList = (mapUsStates) => {
        const statesList = [...mapUsStates]
        statesList.sort((a, b) => {
            return a.cases > b.cases ? -1 : 1
        })
        return statesList
    }

    load = (setCountries) => {
        this.setUsState = setCountries
        fetch('https://disease.sh/v3/covid-19/states')
            .then(res => res.json())
            .then(data =>
                this.#processDataColor(data)
            )
    }

    #processDataColor = (data) => {
        for (let i = 0; i < this.mapUsStates.length; i++) {
            const eachState = this.mapUsStates[i];

            const stateCovid = data.find(stateCovid => stateCovid.state === eachState.properties.NAME)
            if (stateCovid !== null) {
                eachState.properties = stateCovid
                // eachState.properties.recoveredPerOneMillion = Math.floor((stateCovid?.recovered / stateCovid?.cases) * 1_000_000)
            }
            this.#setStateColor(eachState)
        }

        this.setUsState(this.mapUsStates)

    }

    #setStateColor = (eachState) => {
        const itemCases = legendStates[0].legends.find(item => item.isFor(eachState.properties.casesPerOneMillion))
        const itemDeaths = legendStates[1].legends.find(item => item.isFor(eachState.properties.deathsPerOneMillion))
        const itemRecovered = legendStates[2].legends.find(item => item.isFor(eachState.properties.recovered))

        if (itemCases !== null || itemDeaths !== null || itemRecovered !== null) {
            eachState.properties.colorCases = itemCases.color
            eachState.properties.colorDeaths = itemDeaths.color
            eachState.properties.colorRecovered = itemRecovered.color
        }
    }

}

export default LoadUsaTasks;

