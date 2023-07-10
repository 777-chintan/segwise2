import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { styled } from '@mui/material/styles';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

YearlyAnalysisChart.propTypes = {
  chartData: PropTypes.array,
  chartLabel: PropTypes.array,
};

export default function YearlyAnalysisChart({ chartData, chartLabel }) {
  const chartOptions = useChart({
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: chartLabel,
    },
    yaxis: {
      title: {
        text: 'TOTAL SALARY SPENT',
      },
      labels: { formatter: (val) => `$ ${val / 1000000}M` },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `$ ${val / 1000}k`,
      },
    },
  });

  return (
    <StyledChartWrapper dir="ltr">
      <ReactApexChart type="bar" series={chartData} options={chartOptions} height={300} />
    </StyledChartWrapper>
  );
}
