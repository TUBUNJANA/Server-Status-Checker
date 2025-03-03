import { useState, useEffect } from 'react';
import { DeleteContainer, StyledSelect, DeleteButton } from './styles';
import { getLogs, deleteServer } from '../../services/api';
import { MenuItem } from '@mui/material';

const DeleteServerForm = ({ onDelete }) => {
  const [servers, setServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState('');

  useEffect(() => {
    const fetchServers = async () => {
      const logs = await getLogs();
      const uniqueServers = [...new Set(logs.map(log => log.url))];
      setServers(uniqueServers);
    };
    fetchServers();
  }, []);

  const handleDelete = async () => {
    if (selectedServer) {
      await deleteServer(selectedServer);
      setSelectedServer('');
      onDelete();
    }
  };

  return (
    <DeleteContainer>
      <StyledSelect
        select
        label="Select Server"
        value={selectedServer}
        onChange={(e) => setSelectedServer(e.target.value)}
        fullWidth
        variant="outlined"
      >
        {servers.map((server) => (
          <MenuItem key={server} value={server}>
            {server}
          </MenuItem>
        ))}
      </StyledSelect>
      <DeleteButton onClick={handleDelete}>
        Delete Server
      </DeleteButton>
    </DeleteContainer>
  );
};

export default DeleteServerForm;