import React, { useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    sports: '',
    venue: '',
    venuedate: '',
    duration: '',
    equipment: '', // Equipment and quantity will be combined into this field
  });

  const [addedData, setAddedData] = useState([]); // Array to store submitted data

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Split the combined "equipment" field into equipment and equip_quantity
      const equipmentPairs = formData.equipment.split('\n');

      // Process each equipment pair and add it to the addedData array
      const equipmentData = equipmentPairs.map((pair) => {
        const [equipment, equip_quantity] = pair.split(',');
        return { equipment, equip_quantity };
      });

      // Send a POST request to save the formData in the database
      const response = await axios.post('/api/addevents', {
        ...formData,
        equipment: equipmentData,
      });
      console.log(response.data);

      // Add the submitted data to the addedData array for display
      setAddedData([...addedData, { ...formData, equipment: equipmentData }]);

      // Clear the form fields
      setFormData({
        sports: '',
        venue: '',
        venuedate: '',
        duration: '',
        equipment: '',
      });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <form onSubmit={handleSubmit}>
        {/* Sports Input */}
        <label>
          Sport:
          <input
            type="text"
            name="sports"
            onChange={handleInputChange}
            value={formData.sports}
          />
        </label>

        {/* Venues Input */}
        <label>
          Venue:
          <input
            type="text"
            name="venue"
            onChange={handleInputChange}
            value={formData.venue}
          />
        </label>

        {/* Venue Date Input */}
        <label>
          Venue Date:
          <input
            type="date"
            name="venuedate"
            onChange={handleInputChange}
            value={formData.venuedate}
          />
        </label>

        {/* Venue Duration Input */}
        <label>
          Venue Duration:
          <input
            type="time"
            name="duration"
            onChange={handleInputChange}
            value={formData.duration}
          />
        </label>

        {/* Equipment Input (Combined) */}
        <label>
          Equipment and Quantity:
          <textarea
            type="text"
            name="equipment"
            onChange={handleInputChange}
            value={formData.equipment}
          />
        </label>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>

      {/* Display Added Data */}
      <div className="added-data">
        <h2>Added Data</h2>
        <ul>
          {addedData.map((item, index) => (
            <li key={index}>
              <p>Sport: {item.sports}</p>
              <p>Venue: {item.venue}</p>
              <p>Venue Date: {item.venuedate}</p>
              <p>Venue Duration: {item.duration}</p>
              <p>Equipment:</p>
              <ul>
                {item.equipment.map((equipment, equipIndex) => (
                  <li key={equipIndex}>
                    <p>Equipment: {equipment.equipment}</p>
                    <p>Quantity: {equipment.equip_quantity}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
