import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';  // Add this import
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const DeleteContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  width: '100%',
  padding: theme.spacing(2),
}));

export const StyledSelect = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
  },
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  alignSelf: 'flex-start',
  padding: '10px 24px',
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: '8px',
  backgroundColor: theme.palette.error.main,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));