import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pie } from "react-chartjs-2";
import { Legend, PieContainer } from "./styles";
import "./styles.css";

const chartColors = [
  "#485fba",
  "#e8d685",
  "#ad85c9",
  "#caf0e1",
  "#d48652",
  "#629b6d",
  "#719dc4",
  "#73bdff",
  "#9a5364",
  "#42ef79",
  "#10f9f4"
];

function generateData(props) {
  const { xaxis, data, keys } = props;

  const datasets = [];

  data.forEach((item, index) => {
    let obj = {
      data: null,
      backgroundColor: chartColors.slice(index, index + 10),
      hoverBackgroundColor: chartColors.slice(index, index + 10),
      label: "",
      labels: null
    };

    obj.data = item.data;
    obj.label = keys[index];
    obj.labels = item.labels;

    datasets.push(obj);
  });

  return {
    labels: xaxis,
    datasets
  };
}

const options = {
  maintainAspectRatio: false,
  // responsive: true,
  legend: {
    display: false,
    position: "right"
  },
  legendCallback: function(chart) {
    var ul = document.createElement("ul");
    chart.data.datasets.forEach(function(dataset, datasetIndex) {
      let backgroundColor = dataset.backgroundColor;
      dataset.labels.forEach(function(label, labelIndex) {
        ul.innerHTML += `
                <li>
                   <span style="background-color: ${
                     backgroundColor[labelIndex]
                   }"></span>
                    ${label}
                 </li>
              `;
      });
    });
    return ul.outerHTML;
  },
  elements: {
    arc: {
      borderWidth: 0
    }
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem, data) {
        var dataset = data.datasets[tooltipItem.datasetIndex];
        var index = tooltipItem.index;
        return dataset.labels[index] + ": " + dataset.data[index];
      }
    }
  }
};

const PieChart = props => {
  const myRef = useRef(null);
  const data = generateData(props);

  useEffect(() => {
    document.getElementById(
      "legend"
    ).innerHTML = myRef.current.chartInstance.generateLegend();
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <PieContainer>
        <Pie data={data} options={options} ref={myRef} />
        <Legend id="legend" />
      </PieContainer>
    </div>
  );
};

const pieChartData = [
  {
    data: [300, 50, 100],
    labels: ["aa", "bb", "cc"]
  },
  {
    data: [120, 150, 100],
    labels: ["aa2", "bb2", "cc2"]
  }
];

const rootElement = document.getElementById("root");
ReactDOM.render(
  <PieChart
    data={pieChartData}
    xaxis={["Block", "File", "Object"]}
    keys={["Types", "Vendors"]}
  />,
  rootElement
);
