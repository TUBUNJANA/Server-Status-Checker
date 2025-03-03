import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { StyledTableContainer } from './styles';

const ServerLogsTable = ({ logs }) => {
  const theme = useTheme(); // Get theme from Material-UI
  
  const columns = [
    { field: 'url', headerName: 'Server URL', width: 300 },
    { field: 'status_code', headerName: 'Status Code', width: 150 },
    { field: 'response_time', headerName: 'Response Time (s)', width: 200 },
    { field: 'checked_at', headerName: 'Last Checked', width: 250 },
  ];

  const rows = logs.map((log, index) => ({
    id: index,
    ...log,
    checked_at: new Date(log.checked_at).toLocaleString(),
    response_time: log.response_time || 'N/A'
  }));

  return (
    <StyledTableContainer>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
        disableSelectionOnClick
        sx={{
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
        }}
      />
    </StyledTableContainer>
  );
};
export default ServerLogsTable;