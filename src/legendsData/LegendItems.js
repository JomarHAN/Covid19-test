import LegendItem from './LegendItem'

const legendItems = [
    {
        type: "cases",
        legends: [
            new LegendItem(
                "Worst",
                "#741f1f",
                (cases) => cases >= 80_000,
                "white",
                "rgba(204, 16, 52, 0.5)",
            ),
            new LegendItem(
                "Very Servere",
                "#9c2929",
                (cases) => cases < 80_000 && cases >= 60_000,
                "white",
            ),
            new LegendItem(
                "Servere",
                "#c57f7f",
                (cases) => cases < 60_000 && cases >= 40_000,
            ),
            new LegendItem(
                "Moderate",
                "#d8aaaa",
                (cases) => cases < 40_000 && cases >= 20_000,
            ),
            new LegendItem(
                "Mild",
                "#ebd4d4",
                (cases) => cases < 20_000 && cases > 0,
            ),

            new LegendItem(
                "No Data",
                "#ffffff",
                (cases) => true,
            ),

        ]
    },
    {
        type: "deaths",
        legends: [
            new LegendItem(
                "Worst",
                "#460146",
                (cases) => cases >= 20,
                "white",
                "9a009a8a"
            ),
            new LegendItem(
                "Very Servere",
                "#6f016f",
                (cases) => cases < 20 && cases >= 15,
                "white",
            ),
            new LegendItem(
                "Servere",
                "#ea03ea",
                (cases) => cases < 15 && cases >= 10,
            ),
            new LegendItem(
                "Moderate",
                "#ff36ff",
                (cases) => cases < 10 && cases >= 5,
            ),
            new LegendItem(
                "Mild",
                "#ffb9ff",
                (cases) => cases < 5 && cases > 0,
            ),

            new LegendItem(
                "No Data",
                "#ffffff",
                (cases) => true,
            ),

        ]
    },
    {
        type: "recovered",
        legends: [
            new LegendItem(
                "Best",
                "#004800",
                (cases) => cases >= 80,
                "white",
                "008000ad"
            ),
            new LegendItem(
                "Very Good",
                "#018a01",
                (cases) => cases < 80 && cases >= 60,
                "white",
            ),
            new LegendItem(
                "Good",
                "#03f303",
                (cases) => cases < 60 && cases >= 40,
            ),
            new LegendItem(
                "Moderate",
                "#66f966",
                (cases) => cases < 40 && cases >= 20,
            ),
            new LegendItem(
                "Mild",
                "#b6f9b6",
                (cases) => cases < 20 && cases > 0,
            ),

            new LegendItem(
                "No Data",
                "#ffffff",
                (cases) => true,
            ),

        ]
    }
]

export default legendItems;