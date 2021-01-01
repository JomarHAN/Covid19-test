class ChartDataTasks {
    setDataChart

    loadData = (casesType, countryCovid, setDataChart) => {
        this.setDataChart = setDataChart
        fetch(countryCovid === "worldwide" ? 'https://disease.sh/v3/covid-19/historical/all?lastdays=30' : `https://disease.sh/v3/covid-19/historical/${countryCovid}?lastdays=30`)
            .then((res) => res.json())
            .then(data => {
                if (countryCovid !== 'worldwide') {
                    const countryData = data.timeline
                    this.#buildDataChart(countryData, casesType)
                } else {
                    this.#buildDataChart(data, casesType)
                }
            })
    }

    #buildDataChart = (data, casesType) => {
        let chartData = [];
        let lastDataPoint = null
        for (let date in data?.cases) {
            if (lastDataPoint) {
                let newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date]
        }

        this.setDataChart(chartData)

    }
}

export default ChartDataTasks;