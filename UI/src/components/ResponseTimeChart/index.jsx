import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
  } from 'recharts';
  import { 
    StyledChartContainer, 
    StyledChartPaper, 
    StyledChartTitle 
  } from './styles';
  
  const ResponseTimeChart = ({ logs }) => {
    const servers = [...new Set(logs.map(log => log.url))];
  
    return (
      <StyledChartContainer>
        {servers.map((server) => {
          const serverLogs = logs
            .filter(log => log.url === server)
            .sort((a, b) => new Date(a.checked_at) - new Date(b.checked_at));
  
          return (
            <StyledChartPaper key={server}>
              <StyledChartTitle variant="h6">
                {server} Response Time
              </StyledChartTitle>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={serverLogs}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="checked_at" 
                    tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                  />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="response_time" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </StyledChartPaper>
          );
        })}
      </StyledChartContainer>
    );
  };
  export default ResponseTimeChart;