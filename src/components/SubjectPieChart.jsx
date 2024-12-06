import React from "react";
import { PieChart } from "@mui/x-charts";
import PropTypes from "prop-types";

const SubjectPieChart = ({ data }) => {
  // Paleta de colores personalizada para el gráfico
  const colors = ["#009929", "#003400", "#006414", "#FF5733"];

  if (data.length === 0) {
    return <p>No hay datos disponibles</p>;
  }

  // Preparar los datos para el gráfico
  const chartData = data.map((item, index) => ({
    id: index,
    value: item.cantidad,
    label: item.nombre,
    color: colors[index % colors.length]
  }));

  return (
    <PieChart
      series={[
        {
          data: chartData
        }
      ]}
      colors={colors}
      height={300}
      width={300}
      slotProps={{ legend: { hidden: false } }}
    />
  );
};

// Validar los props del componente
SubjectPieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      cantidad: PropTypes.number.isRequired
    })
  )
};

export default SubjectPieChart;
