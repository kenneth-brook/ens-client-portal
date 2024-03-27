import { globalState } from '../reactive/state.js'

let chart

export function loadPage() {
  const setStage = document.getElementById('contentBody')
  // Ensure the chart container exists as a separate entity
  setStage.innerHTML =
    '<div id="chartContainer" style="height: 400px; min-width: 60%"></div>'

  // Add home page specific content
  const homeContent = document.createElement('div')
  setStage.insertBefore(homeContent, setStage.firstChild)

  // Initialize the chart in the dedicated container
  chart = Highcharts.chart('chartContainer', {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Live Active Incidents Count',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Time',
      },
    },
    yAxis: {
      title: {
        text: 'Active Incidents Count',
      },
    },
    series: [
      {
        name: 'Active Incidents',
        data: [], // Initial empty data
      },
    ],
  })

  // Update the chart every 60 seconds
  setInterval(function () {
    const state = globalState.getState() // Fetch the current state
    const mainDataCount = state.mainData ? state.mainData.length : 0 // Calculate the current count
    console.log(`data count: ${mainDataCount}`)
    var x = new Date().getTime(), // current time
      y = mainDataCount

    console.log(`Attempting to add point: [${x}, ${y}]`)

    // Validate series reference and add point
    if (chart && chart.series && chart.series.length > 0) {
      chart.series[0].addPoint([x, y], true, true)
    }
    chart.redraw()
  }, 60000) // Update every minute
}
