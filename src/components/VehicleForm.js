import React, { useState, useEffect } from 'react';
import './VehicleForm.css';

function VehicleForm({ onSubmit, editingVehicle, onUpdate, onCancelEdit }) {
  const [formData, setFormData] = useState({
     name: '',
    vehicleType: '',
    chassisNumber: ''
  });

  useEffect(() => {
    if (editingVehicle) {
      setFormData({
        name: editingVehicle.name,
        vehicleType: editingVehicle.vehicleType,
        chassisNumber: editingVehicle.chassisNumber
      });
    }
  }, [editingVehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
       [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingVehicle) {
      const success = await onUpdate(editingVehicle.id, formData.name);
      if (success) {
        resetForm();
      }
    } else {
      const success = await onSubmit(formData);
      if (success) {
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      vehicleType: '',
      chassisNumber: ''
    });
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <div className="vehicle-form-container">
      <h2>{editingVehicle ? '✏️ Update Vehicle Name' : '➕ Add New Vehicle'}</h2>
      <form onSubmit={handleSubmit} className="vehicle-form">
        <div className="form-group">
          <label htmlFor="name">Vehicle Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter vehicle name"
            required
          />
        </div>

        {!editingVehicle && (
          <>
            <div className="form-group">
              <label htmlFor="vehicleType">Vehicle Type *</label>
              <select
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                required
              >
                <option value="">Select vehicle type</option>
                <option value="Two Wheeler">Two Wheeler</option>
                <option value="Three Wheeler">Three Wheeler</option>
                <option value="Four Wheeler">Four Wheeler</option>
                <option value="Heavy Vehicle">Heavy Vehicle</option>
                <option value="Commercial Vehicle">Commercial Vehicle</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="chassisNumber">Chassis Number *</label>
              <input
                type="text"
                id="chassisNumber"
                name="chassisNumber"
                value={formData.chassisNumber}
                onChange={handleChange}
                placeholder="Enter chassis number"
                required
              />
            </div>
          </>
        )}

        {editingVehicle && (
          <div className="info-fields">
            <div className="info-item">
              <strong>Vehicle Type:</strong>
              <span>{editingVehicle.vehicleType}</span>
            </div>
            <div className="info-item">
              <strong>Chassis Number:</strong>
              <span>{editingVehicle.chassisNumber}</span>
            </div>
            <p className="info-note">⚠️ These fields cannot be updated</p>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingVehicle ? '💾 Update Name' : '➕ Add Vehicle'}
          </button>
          {editingVehicle && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              ❌ Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default VehicleForm;
