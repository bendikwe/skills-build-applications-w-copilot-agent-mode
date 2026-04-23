import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${baseUrl}/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities endpoint:', endpoint);
        console.log('Fetched activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                {activities.length > 0 && Object.keys(activities[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={activity.id || idx}>
                  {Object.values(activity).map((value, i) => (
                    <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {activities.length === 0 && <div className="text-muted">No activities found.</div>}
        </div>
      </div>
    </div>
  );
};

export default Activities;
