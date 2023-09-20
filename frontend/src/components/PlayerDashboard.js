import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlayerDashboard.css'; // Import the CSS file

const PlayerDashboard = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedVenueDate, setSelectedVenueDate] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedEquipmentQuantities, setSelectedEquipmentQuantities] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestStatus, setRequestStatus] = useState('Request pending');
  const [formData, setFormData] = useState('');
  const [addedData, setAddedData] = useState('');

  useEffect(() => {
    // Make an Axios GET request to fetch all data from the server
    axios.get('http://localhost:4000/api/viewevents')
      .then((response) => {
        // Set the retrieved data in the state
        setAllData(response.data);
        setLoading(false); // Data has been loaded
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false); // Data loading failed
      });
  }, []);

  const handleEquipmentCheckboxChange = (event) => {
    const equipmentName = event.target.name;
    const isChecked = event.target.checked;

    setSelectedEquipmentQuantities((prevQuantities) => ({
      ...prevQuantities,
      [equipmentName]: isChecked ? 1 : 0,
    }));
  };

  const handleEquipmentQuantityChange = (event) => {
    const equipmentName = event.target.name;
    const quantity = parseInt(event.target.value, 10);

    setSelectedEquipmentQuantities((prevQuantities) => ({
      ...prevQuantities,
      [equipmentName]: quantity,
    }));
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
      const response = await axios.post('http://localhost:4000/api/addbookings', {
        sports: selectedSport,
        venue: selectedVenue,
        venuedate: selectedVenueDate,
        duration: selectedDuration,
        equipment: equipmentData,
        status: selectedStatus,
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
        status: '',
      });
    } catch (error) {
      console.error(error);
    }

    console.log('Selected Sport:', selectedSport);
    console.log('Selected Venue:', selectedVenue);
    console.log('Selected Venue Date:', selectedVenueDate);
    console.log('Selected Duration:', selectedDuration);
    console.log('Selected Equipment Quantities:', selectedEquipmentQuantities);
    console.log('Selected Status:', selectedStatus);


    setRequestStatus('Request pending');
    setIsSubmitted(true);
    
    setTimeout(() => {
      // Set the request status to "Request approved" when approved
      setRequestStatus('Request approved');
    }, 2000);
  };

 
  // Filter equipment options based on the selected sport
  const equipmentOptions = allData
    .filter((item) => item.sports === selectedSport)
    .map((item, index) => (
      <div className="equipment-item" key={index}>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name={item.equipment}
            checked={selectedEquipmentQuantities[item.equipment] > 0}
            onChange={handleEquipmentCheckboxChange}
          />
          {item.equipment}
        </label>
        <input
          type="number"
          name={item.equipment}
          value={selectedEquipmentQuantities[item.equipment] || ''}
          onChange={handleEquipmentQuantityChange}
          min="0"
          className="quantity-input"
        />
      </div>
    ));

  // Filter venue options based on the selected sport
  const venueOptions = allData
    .filter((item) => item.sports === selectedSport)
    .map((item, index) => (
      <option key={index} value={item.venue}>
        {item.venue}
      </option>
    ));

  // Filter venue date options based on the selected sport
  const venueDateOptions = allData
    .filter((item) => item.sports === selectedSport)
    .map((item, index) => (
      <option key={index} value={item.venuedate}>
        {item.venuedate}
      </option>
    ));

  // Filter duration options based on the selected sport
  const durationOptions = allData
    .filter((item) => item.sports === selectedSport)
    .map((item, index) => (
      <option key={index} value={item.duration}>
        {item.duration}
      </option>
    ));

  return (
    <div className="player-dashboard">
      <h2>Select Options:</h2>
      {loading ? (
        <p className="loading-message">Loading data...</p>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="sports">Select Sport:</label>
            <select
              id="sports"
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              required
            >
              <option value="">Select a Sport</option>
              {allData.map((item, index) => (
                <option key={index} value={item.sports}>
                  {item.sports}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="venue">Select Venue:</label>
            <select
              id="venue"
              value={selectedVenue}
              onChange={(e) => setSelectedVenue(e.target.value)}
              required
            >
              <option value="">Select a Venue</option>
              {venueOptions}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="venuedate">Venue Date:</label>
            <select
              id="venuedate"
              value={selectedVenueDate}
              onChange={(e) => setSelectedVenueDate(e.target.value)}
              required
            >
              <option value="">Select Venue Date</option>
              {venueDateOptions}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration:</label>
            <select
              id="duration"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              required
            >
              <option value="">Select Duration</option>
              {durationOptions}
            </select>
          </div>

          <div className="form-group">
            <h2>Available Equipment:</h2>
            {equipmentOptions}
          </div>

          <div>
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>

          {isSubmitted && (
            <div className="request-status">
              <p>Request Status: {requestStatus}</p>
            </div>
          )}


        </div>
      )}
    </div>
  );
};

export default PlayerDashboard;
