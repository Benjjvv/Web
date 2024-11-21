Highcharts.chart("donaciones", {
    chart: {
      type: "column",
    },
    title: {
      text: "Comunas por Donacion",
    },
    xAxis: {
      categories: [], 
      title: {
        text: "Comunas",
      },
      min: 1,
    },
    yAxis: {
      title: {
        text: "Número de Donaciones",
      },
      min: 0, 
    },
    legend: {
      align: "left",
      verticalAlign: "top",
      borderWidth: 0,
    },
  
    tooltip: {
      shared: true,
      crosshairs: true,
    },
  
    series: [
      {
        name: "Número de Donaciones",
        data: [],
        lineWidth: 1,
        marker: {
          enabled: true,
          radius: 4,
        },
        color: "#93B2FD",
      },
    ],
  });

Highcharts.chart("dispositivos", {
  chart: {
    type: "pie",  
  },
  title: {
    text: "Tipos de Dispositivos Donados",
  },
  xAxis: {
    categories: ["pantalla","notebook","tablet","celular","consola","mouse","teclado","impresora","parlante","audífonos","otro"], // Aquí se agregarán los tipos de dispositivos
    title: {
      text: "Tipo de Dispositivo",
    },
  },
  yAxis: {
    title: {
      text: "Número de Dispositivos",
    },
    min: 0, 
  },
  legend: {
    align: "left",
    verticalAlign: "top",
    borderWidth: 0,
  },

  tooltip: {
    shared: true,
    crosshairs: true,
  },

  series: [
    {
      name: "Numero de Dispositivos",
      data: [],
      lineWidth: 1,
      marker: {
        enabled: true,
        radius: 4,
      },
      color: "#65fc28",
    },
  ],
});

  fetch("http://127.0.0.1:5000/get-stats-data")
    .then((response) => response.json())
    .then((data) => {
      console.log("Datos recibidos:", data); 
      // contador
      let tipoCounts = {};
      let nombresComunas = {};
      
      data.forEach((item) => {
        if(item.comunas) {
          if(!nombresComunas[item.comunas]){
            nombresComunas[item.comunas] = 0;
          }
          nombresComunas[item.comunas]++;
        }
        if (item.tipos) {
          if (!tipoCounts[item.tipos]) {
            tipoCounts[item.tipos] = 0;
          }
          tipoCounts[item.tipos]++;
        }
      });
      comunas_registradas = Object.keys(nombresComunas)

      // parsear data
      let chartData_Don = [];
      for (let comuna in nombresComunas) {
        chartData_Don.push([comuna, nombresComunas[comuna]]);
      }

      let chartData_Disp = [];
      for (let tipo in tipoCounts) {
        chartData_Disp.push([tipo, tipoCounts[tipo]]);
      }
      
      // Get the chart by ID
      const chartDon = Highcharts.charts.find(
        (chart) => chart && chart.renderTo.id === "donaciones"
      );

      const chartDisp = Highcharts.charts.find(
        (chart) => chart && chart.renderTo.id === "dispositivos"
      );
      
      // Update the chart with new data
      chartDon.update({
        xAxis: categories = comunas_registradas,
        series: [
          {
            data: chartData_Don,
          },
        ],
      });
      
      chartDisp.update({
        series: [
          {
            data: chartData_Disp,
          },
        ],
      });
    })
    .catch((error) => console.error("Error:", error));