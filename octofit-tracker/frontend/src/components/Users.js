import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${baseUrl}/api/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users endpoint:', endpoint);
        console.log('Fetched users:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Users</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                {users.length > 0 && Object.keys(users[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id || idx}>
                  {Object.values(user).map((value, i) => (
                    <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <div className="text-muted">No users found.</div>}
        </div>
      </div>
    </div>
  );
};

export default Users;
