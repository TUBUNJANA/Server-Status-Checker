import { styled } from '@mui/material/styles';

export const StyledTableContainer = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '12px',
  overflow: 'hidden',
  '& .MuiDataGrid-root': {
    border: 'none',
    fontSize: '0.875rem',
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.background.default,
  }
}));