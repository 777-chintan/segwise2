import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Card, CardHeader, MenuItem, TextField } from '@mui/material';

// sections
import { AppCurrentVisits, YearlyAnalysisChart } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

// excel data
import { keyMap, data, groupByKey, YearlyData, getTotalSalary } from '../utils/ds_salaries';
import { countryMap } from '../utils/countryCode';

export default function DashboardAppPage() {
  const theme = useTheme();

  // filter by key
  const [filterValue, setFilterValue] = useState('work_year');
  const chartData = useMemo(() => {
    const d = groupByKey(data, filterValue);
    return Object.keys(d).map((ent) => ({
      label: filterValue === 'employee_residence' || filterValue === 'company_location' ? countryMap[ent].name : ent,
      value: d[ent].length,
    }));
  }, [filterValue]);

  // filter based on key & get yearly salary data
  const yearlyFilterKeys = ['experience_level', 'employment_type', 'remote_ratio', 'company_size'];

  const [salaryFilterValue, setSalaryFilterValue] = useState('experience_level');

  const salaryChartData = useMemo(() => {
    const chartData = {};
    const allKeysData = groupByKey(data, salaryFilterValue);
    const ChartLabel = Object.keys(allKeysData).map((key) => key);
    Object.keys(YearlyData).forEach((key) => {
      const d = groupByKey(YearlyData[key], salaryFilterValue);
      ChartLabel.forEach((label) => {
        if (!!!chartData?.[key]) {
          chartData[key] = [];
        }
        chartData[key].push(d?.[label] ? getTotalSalary(d[label]) : 0);
      });
    });
    const convertedChartData = Object.keys(chartData).map((year) => ({ name: year, data: chartData[year] }));
    return {
      chartData: convertedChartData,
      chartLabel: ChartLabel.map((ent) =>
        salaryFilterValue === 'employee_residence' || salaryFilterValue === 'company_location'
          ? countryMap[ent].name
          : ent
      ),
    };
  }, [salaryFilterValue]);

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <Grid container>
                <Grid item xs={6}>
                  <CardHeader title={'Total Jobs'} />
                </Grid>
                <Grid item xs={6} padding={2}>
                  <TextField
                    fullWidth
                    label="Select Field"
                    value={filterValue}
                    select
                    onChange={(e) => {
                      setFilterValue(e.target.value);
                    }}
                  >
                    {Object.keys(keyMap).map((key) => (
                      <MenuItem value={key} key={key}>
                        {keyMap[key]}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <AppCurrentVisits chartData={chartData} />
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <Grid container>
                <Grid item xs={6}>
                  <CardHeader title={'Yearly Total Salary Spent'} />
                </Grid>
                <Grid item xs={6} padding={2}>
                  <TextField
                    fullWidth
                    label="Select Field"
                    value={salaryFilterValue}
                    select
                    onChange={(e) => {
                      setSalaryFilterValue(e.target.value);
                    }}
                  >
                    {yearlyFilterKeys.map((key) => (
                      <MenuItem value={key} key={key}>
                        {keyMap[key]}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <YearlyAnalysisChart chartData={salaryChartData.chartData} chartLabel={salaryChartData.chartLabel} />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
