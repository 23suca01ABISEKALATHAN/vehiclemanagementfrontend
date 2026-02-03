import React, { useState, useEffect } from 'react';
import vehicleService from './services/vehicleService';
import VehicleForm from './components/VehicleForm';
import VehicleList from './components/VehicleList';
import './App.css';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await vehicleService.getAllVehicles();
      setVehicles(data);
    } catch (err) {
      setError('Failed to load vehicles. Make sure the backend is running.');
      console.error('Error loading vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVehicle = async (vehicleData) => {
    setError('');
    try {
      await vehicleService.createVehicle(vehicleData);
      await loadVehicles();
      return true;
    } catch (err) {
      const errorMsg = err.response?.data || 'Failed to create vehicle';
      setError(errorMsg);
      console.error('Error creating vehicle:', err);
      return false;
    }
  };

  const handleUpdateVehicle = async (id, name) => {
    setError('');
    try {
      await vehicleService.updateVehicleName(id, name);
      await loadVehicles();
      setEditingVehicle(null);
      return true;
    } catch (err) {
      setError('Failed to update vehicle');
      console.error('Error updating vehicle:', err);
      return false;
    }
  };

  const handleDeleteVehicle = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setError('');
      try {
        await vehicleService.deleteVehicle(id);
        await loadVehicles();
      } catch (err) {
        setError('Failed to delete vehicle');
        console.error('Error deleting vehicle:', err);
      }
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
  };

  const handleCancelEdit = () => {
    setEditingVehicle(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🚗 RTO Vehicle Management System</h1>
        <p>Manage your vehicle registrations efficiently</p>
      </header>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="content-container">
        <VehicleForm
          onSubmit={handleCreateVehicle}
          editingVehicle={editingVehicle}
          onUpdate={handleUpdateVehicle}
          onCancelEdit={handleCancelEdit}
        />

        <VehicleList
          vehicles={vehicles}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDeleteVehicle}
        />
      </div>
    </div>
  );
}

export default App;
