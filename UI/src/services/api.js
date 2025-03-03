const API_URL = "http://127.0.0.1:5000";

export const getLogs = async () => {
  const response = await fetch(`${API_URL}/logs`);
  return response.json();
};

export const addServer = async (url) => {
  const response = await fetch(`${API_URL}/add_server`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });
  return response.json();
};

export const deleteServer = async (url) => {
  const response = await fetch(`${API_URL}/delete_server`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });
  return response.json();
};