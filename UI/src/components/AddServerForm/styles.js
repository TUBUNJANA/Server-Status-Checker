import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';  // Add this import
import Button from '@mui/material/Button';

export const FormContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  width: '100%',
  padding: theme.spacing(2),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  alignSelf: 'flex-start',
  padding: '10px 24px',
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: '8px',
}));