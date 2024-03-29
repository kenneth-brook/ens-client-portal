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
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        marker: {
          enabled: true,
          radius: 5,
        },
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
    console.log('Interval callback executed')
    const state = globalState.getState() // Fetch the current state
    const mainDataCount = state.mainData ? state.mainData.length : 0 // Calculate the current count
    const x = new Date().getTime() // current time
    const y = mainDataCount // your dynamically obtained value

    console.log(`Adding point: [${x}, ${y}]`)
    const shouldShift = chart.series[0].data.length >= 15
    console.log(
      `Should shift: ${shouldShift}`,
      chart.series[0].data.map((d) => d.y),
    )

    chart.series[0].addPoint([x, y], true, shouldShift)
  }, 60000)
}
