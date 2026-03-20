import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import VehicleList from '../components/VehicleList';

// Mock data
const mockVehicles = [
  {
    id: 1,
    name: "TestCar",
    vehicleType: "Four Wheeler",
    chassisNumber: "ABC123"
  }
];

// ✅ Test 1: Title rendering
test("renders vehicle list title", () => {
  render(
    <VehicleList
      vehicles={mockVehicles}
      loading={false}
      onEdit={() => {}}
      onDelete={() => {}}
    />
  );

  expect(screen.getByText(/Vehicle List/i)).toBeInTheDocument();
});

// ✅ Test 2: Vehicle data rendering
test("renders vehicle data", () => {
  render(
    <VehicleList
      vehicles={mockVehicles}
      loading={false}
      onEdit={() => {}}
      onDelete={() => {}}
    />
  );

  expect(screen.getByText("TestCar")).toBeInTheDocument();
  expect(screen.getByText("ABC123")).toBeInTheDocument();
});

// ✅ Test 3: Loading state
test("shows loading state", () => {
  render(
    <VehicleList
      vehicles={[]}
      loading={true}
      onEdit={() => {}}
      onDelete={() => {}}
    />
  );

  expect(screen.getByText(/Loading vehicles/i)).toBeInTheDocument();
});

// ✅ Test 4: Empty state
test("shows empty message", () => {
  render(
    <VehicleList
      vehicles={[]}
      loading={false}
      onEdit={() => {}}
      onDelete={() => {}}
    />
  );

  expect(screen.getByText(/No vehicles registered/i)).toBeInTheDocument();
});

// ✅ Test 5: Correct password → delete should happen
test("delete button triggers delete on correct password", () => {
  window.prompt = jest.fn(() => "1234"); // correct password
  const mockDelete = jest.fn();

  render(
    <VehicleList
      vehicles={mockVehicles}
      loading={false}
      onEdit={() => {}}
      onDelete={mockDelete}
    />
  );

  const deleteButton = screen.getByText(/Delete/i);
  deleteButton.click();

  expect(mockDelete).toHaveBeenCalled();
});

// ✅ Test 6: Wrong password → delete should NOT happen
test("wrong password does not delete vehicle", () => {
  window.prompt = jest.fn(() => "0000"); // wrong password
  window.alert = jest.fn();

  const mockDelete = jest.fn();

  render(
    <VehicleList
      vehicles={mockVehicles}
      loading={false}
      onEdit={() => {}}
      onDelete={mockDelete}
    />
  );

  const deleteButton = screen.getByText(/Delete/i);
  deleteButton.click();

  expect(mockDelete).not.toHaveBeenCalled();
});