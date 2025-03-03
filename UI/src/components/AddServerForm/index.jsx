import { useState } from 'react';
import { FormContainer, StyledTextField, StyledButton } from './styles';

const AddServerForm = ({ onAdd }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (url) {
      await addServer(url);
      setUrl('');
      onAdd();
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <StyledTextField
        label="Server URL"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <StyledButton
        type="submit"
        variant="contained"
        color="primary"
      >
        Add Server
      </StyledButton>
    </FormContainer>
  );
};

export default AddServerForm;