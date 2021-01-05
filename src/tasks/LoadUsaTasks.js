import { features } from '../datajson/us-states.json'
class LoadUsaTasks {
    mapUsStates = features
    setUsState = null
    load = (setCountries) => {
        this.setUsState = setCountries



        fetch('https://disease.sh/v3/covid-19/states')
            .then(res => res.json())
            .then(data => {
                this.#processDataColor(data)
                // console.log(data)
            })

    }

    #processDataColor = (data) => {
        console.log(features)
        // console.log(this.mapUsStates)
        for (let i = 0; i < this.mapUsStates.length; i++) {
            const eachState = this.mapUsStates[i];
            // console.log(this.mapUsStates[i])
            const stateCovid = data.find(stateCovid => stateCovid.state === eachState.properties.NAME)
            if (stateCovid !== null) {

                eachState.properties = stateCovid

                eachState.properties.recoveredPerOneMillion = Math.floor((stateCovid?.recovered / stateCovid?.cases) * 1_000_000)
            }

        }
        this.setUsState(this.mapUsStates)
    }
}

export default LoadUsaTasks;

