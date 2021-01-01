class LegendItem {
    constructor(title, color, isFor, textColor, backgroundChart) {
        this.title = title;
        this.color = color;
        this.isFor = isFor;
        this.textColor = textColor != null ? textColor : "black"
        this.backgroundChart = backgroundChart;
    }
}

export default LegendItem;