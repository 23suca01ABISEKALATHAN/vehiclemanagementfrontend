import React from 'react';
import './VehicleList.css';

function VehicleList({ vehicles, loading, onEdit, onDelete }) {

  // 🔐 Password-protected delete function
  const handleDeleteWithPassword = (id) => {
    const password = prompt("Enter 4-digit password to delete:");

    if (!password) return;

    if (password !== "1234") {
      alert("Incorrect password!");
      return;
    }

    onDelete(id); // Call original delete function
  };

  if (loading) {
    return (
      <div className="vehicle-list-container">
        <h2>📋 Vehicle List</h2>
        <div className="loading">Loading vehicles...</div>
      </div>
    );
  }

  return (
    <div className="vehicle-list-container">
      <h2>📋 Vehicle List ({vehicles.length})</h2>
      
      {vehicles.length === 0 ? (
        <div className="no-vehicles">
          <p>No vehicles registered yet.</p>
          <p>Add your first vehicle using the form!</p>
        </div>
      ) : (
        <div className="vehicle-grid">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="vehicle-card">
              
              <div className="vehicle-header">
                <h3>{vehicle.name}</h3>
                <span className="vehicle-type-badge">
                  {vehicle.vehicleType}
                </span>
              </div>
              
              <div className="vehicle-details">
                <div className="detail-row">
                  <span className="detail-label">Chassis No:</span>
                  <span className="detail-value">
                    {vehicle.chassisNumber}
                  </span>
                </div>
              </div>

              <div className="vehicle-actions">
                
                <button
                  onClick={() => onEdit(vehicle)}
                  className="btn-edit"
                  title="Edit vehicle name"
                >
                  ✏️ Edit Name
                </button>

                <button
                  onClick={() => handleDeleteWithPassword(vehicle.id)}
                  className="btn-delete"
                  title="Delete vehicle"
                >
                  🗑️ Delete
                </button>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VehicleList;