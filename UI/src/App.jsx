import { useEffect, useState } from 'react';
import { Container, Grid, CssBaseline, Typography } from '@mui/material';
import AddServerForm from './components/AddServerForm';
import DeleteServerForm from './components/DeleteServerForm';
import ServerLogsTable from './components/ServerLogsTable';
import ResponseTimeChart from './components/ResponseTimeChart';
import { getLogs } from './services/api';

const App = () => {
  const [logs, setLogs] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await getLogs();
      setLogs(data);
    };
    fetchLogs();
  }, [refresh]);

  const handleRefresh = () => setRefresh(prev => !prev);

  return (
    <CssBaseline>
      <Container maxWidth="xl">
        <Typography variant="h3" gutterBottom sx={{ mt: 3, mb: 4 }}>
          🔍 Server Status Monitor
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h5" gutterBottom>
              ➕ Add New Server
            </Typography>
            <AddServerForm onAdd={handleRefresh} />

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              🗑️ Delete Server
            </Typography>
            <DeleteServerForm onDelete={handleRefresh} />
          </Grid>

          <Grid item xs={12} md={9}>
            <Typography variant="h5" gutterBottom>
              📊 Server Status Logs
            </Typography>
            <ServerLogsTable logs={logs} />

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              📈 Performance Analysis
            </Typography>
            <ResponseTimeChart logs={logs} />
          </Grid>
        </Grid>
      </Container>
    </CssBaseline>
  );
};

export default App;