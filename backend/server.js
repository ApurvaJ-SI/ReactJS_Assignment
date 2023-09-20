const express = require("express");
const cors = require("cors");
const bcrypt = require('bcrypt');
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());


//user login
  app.post('/api/user-login', async (req, res) => {
    const { username, passkey } = req.body;
  
  
    const user = `SELECT * FROM  users WHERE username = '${username}' AND passkey = '${passkey}'`;
    pool
    .query(user)
    .then((response) => {
        console.log(response.rows);
        res.send(response.rows);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Login failed');
    });
    
    console.log(username, passkey );
  });



//admin login
  app.post('/api/admin-login', async (req, res) => {
    const { username, passkey, secretkey } = req.body;
  
    console.log(username, passkey, secretkey);
    const admin = `SELECT * FROM  users WHERE username = '${username}' AND passkey = '${passkey}' AND secretkey = '${secretkey}'`;
      pool
      .query(admin)
      .then((response) => {
          console.log(response.rows);
          res.send(response.rows);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).send('Login failed');
      });
  });


//add events

// app.post("/api/addevents", (req, res) => {
//     const sports = req.body["sports"];
//     const venue = req.body["venue"];
//     const venuedate = req.body["venuedate"];
//     const duration = req.body["duration"];
//     const equipment = req.body["equipment"];
//     const equip_quantity = req.body["equip_quantity"];

//     console.log("Sport:" + sports);
//     console.log("Venue:" + venue);
//     console.log("Venue Date:" + venuedate);
//     console.log("Venue Time:" + duration);
//     console.log("Equipment:" + equipment);
//     console.log("Equipment Quantity:" + equip_quantity);

//     const insertevents = `INSERT INTO events (sports, venue, venuedate, duration, equipment, equip_quantity) VALUES ('${sports}', '${venue}', '${venuedate}', '${duration}', '${equipment}', '${equip_quantity}');`;

//     pool
//         .query(insertevents)
//         .then((response) => {
//             console.log("Data Saved");
//             console.log(response);
//         })
//         .catch((err) => {
//             console.log(err);
//         });

//     console.log(req.body);
//     res.send("Response Received: " + req.body);
// });

app.post("/api/addevents", async (req, res) => {
  try {
    const { sports, venue, venuedate, duration, equipment } = req.body;

    // Create an array of SQL INSERT statements for each equipment item
    const insertStatements = equipment.map((item) => {
      return `INSERT INTO events (sports, venue, venuedate, duration, equipment, equip_quantity) VALUES ('${sports}', '${venue}', '${venuedate}', '${duration}', '${item.equipment}', '${item.equip_quantity}');`;
    });

    // Execute the INSERT statements in a transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const insertStatement of insertStatements) {
        await client.query(insertStatement);
      }
      await client.query('COMMIT');
      console.log('Data Saved');
      res.send('Data Saved');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error saving data:', error);
      res.status(500).send('Error saving data');
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(error);
  }
});


//post bookings

app.post("/api/addbookings", async (req, res) => {
  try {
    const { sports, venue, venuedate, duration, equipment, status } = req.body;

    // Create an array of SQL INSERT statements for each equipment item
    const inserBookings = equipment.map((item) => {
      return `INSERT INTO bookings (sports, venue, venuedate, duration, equipment, equip_quantity, status) VALUES ('${sports}', '${venue}', '${venuedate}', '${duration}', '${item.equipment}', '${item.equip_quantity}', '${status}');`;
    });

    // Execute the INSERT statements in a transaction
    const player = await pool.connect();
    try {
      await player.query('BEGIN');
      for (const insertBookings of insertBookings) {
        await player.query(insertBookings);
      }
      await player.query('COMMIT');
      console.log('Data Saved');
      res.send('Data Saved');
    } catch (error) {
      await player.query('ROLLBACK');
      console.error('Error saving data:', error);
      res.status(500).send('Error saving data');
    } finally {
      client.release();
    }
  } catch (error) {
    console.error(error);
  }
});





//get events
app.get('/api/viewevents', (req, res) => {
  const selectAllEventsQuery = 'SELECT * FROM events;';

  pool.query(selectAllEventsQuery, (error, results) => {
    if (error) {
      console.error('Error fetching data from "events" table:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results.rows); // Respond with the retrieved data as JSON
    }
  });
});


app.post 



app.listen(4000, () => console.log("Sever on localhost:4000"));