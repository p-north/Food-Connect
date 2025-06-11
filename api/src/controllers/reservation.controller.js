import client from "../database/connectDB.js";

async function handleDonorReservations(req, res) {
  try {
    // view the reservations for a donor
    const donor_id = req.userID;

    // check the donor exists and is valid donor
    // Ensure that the donor is a valid user and that they are actually a "donor"
    const donorCheck = await client.query(
      `SELECT type_of_account FROM users WHERE id = $1`,
      [donor_id]
    );

    // check if donor exists
    if (donorCheck.rows.length == 0) {
      return res
        .status(400)
        .json({ sucess: false, message: "Donor does not exist." });
    }

    // check if correct type
    if (donorCheck.rows[0].type_of_account !== "donor") {
      return res
        .status(400)
        .json({ sucess: false, message: "Targeted user is not type *donor!" });
    }

    // get all the reservations for the donor
    const result = await client.query(
      `SELECT r.id, recipient_id, food_post_id, r.status, r.created_at, r.updated_at FROM reservations r WHERE r.donor_id = $1;`,
      [donor_id]
    );

    return res.status(200).json({
      success: true,
      message: "Reservations fetched successfully",
      reservations: result.rows,
    });
  } catch (error) {
    console.log("Error fetching all donor reservations", error);
    res.status(400).json({ success: false, message: error.message });
  }
}
async function handleRecipientReservations(req, res) {
  // view all of a recipient's reservations
  try {
    // get the id passed in through the AUTH middleware
    const recipient_id = req.userID;

    // ensure the reciepient is a valid user and is type  "reciepient"
    const reCheck = await client.query(
      `SELECT type_of_account FROM users WHERE id = $1;`,
      [recipient_id]
    );

    // check if the user exists
    if (reCheck.rows.length == 0) {
      return res
        .status(400)
        .json({ sucess: false, message: "User does not exist." });
    }

    // check if correct type
    if (reCheck.rows[0].type_of_account !== "recipient") {
      return res
        .status(400)
        .json({ sucess: false, message: "User is not type *recipient!" });
    }

    // get all the reservations for the recipient
    const result = await client.query(
      `SELECT r.id, r.donor_id, r.food_post_id, r.status, r.created_at FROM reservations r WHERE r.recipient_id = $1;`,
      [recipient_id]
    );

    return res.status(200).json({
      success: true,
      message: "Reservations fetched successfully",
      reservations: result.rows,
    });
  } catch (error) {
    console.log("Error fetching all donor reservations", error);
    res.status(400).json({ success: false, message: error.message });
  }
}
async function handleCreateReservation(req, res) {
  try {
    // create a new reservation
    const postID = req.body.food_post_id;

    // get the donor id
    const donorQuery = await client.query(`SELECT user_id FROM food_posts WHERE id = $1;`, [postID]);
    const donor_id = donorQuery.rows[0].user_id;

    // Ensure that the donor is a valid user and that they are actually a "donor"
    const donorCheck = await client.query(
      `SELECT type_of_account FROM users WHERE id = $1;`,
      [donor_id]
    );

    // Check if food post exists
    if (donorQuery.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Food post does not exist."
      });
    }


    // check if donor exists
    if (donorCheck.rows.length == 0) {
      return res.status(400).json({
        sucess: false,
        message: "Provided body donor does not exist.",
      });
    }

    // check if correct type
    if (donorCheck.rows[0].type_of_account !== "donor") {
      return res.status(400).json({
        sucess: false,
        message: "Provided body user is not type *donor!",
      });
    }

    // get the recipient id
    // get the id passed in through the AUTH middleware
    const recipient_id = req.userID;

    // ensure the reciepient is a valid user and is type  "recipient"
    const reCheck = await client.query(
      `SELECT type_of_account FROM users WHERE id = $1;`,
      [recipient_id]
    );

    // check if the user exists
    if (reCheck.rows.length == 0) {
      return res
        .status(400)
        .json({ sucess: false, message: "User does not exist." });
    }

    // check if correct type
    if (reCheck.rows[0].type_of_account !== "recipient") {
      return res
        .status(400)
        .json({ sucess: false, message: "User is not type *recipient!" });
    }

    const status = "pending";

    // make sure that listing does not already list for same recipient, donor and food post
    const listingCheck = await client.query(
      `SELECT * FROM reservations r WHERE r.recipient_id = $1 AND r.donor_id = $2 AND r.food_post_id = $3`,
      [recipient_id, donor_id, postID]
    );

    if (listingCheck.rows.length != 0) {
      return res.status(400).json({
        sucess: false,
        message: "Cannot create. Reservation already exists! Kindly, update it",
      });
    }

    //  create a new listing, marking it as pending
    const listingRes = await client.query(
      `INSERT INTO reservations (recipient_id, donor_id, food_post_id, status) VALUES ($1, $2, $3, $4)`,
      [recipient_id, donor_id, postID, status]
    );

    return res.status(201).json({
      success: true,
      message: "Reservation successfully created. Donor will be notified",
    });
  } catch (error) {
    console.log("Error fetching all donor reservations", error);
    res.status(400).json({ success: false, message: error.message });
  }
}
async function handleReservationUpdate(req, res) {
  try {
    const donorID = req.userID;
    const reservationID = req.params.reservationID;
    const status = req.body.status;

    // Ensure that the donor is a valid user and that they are actually a "donor"
    const donorCheck = await client.query(
      `SELECT type_of_account FROM users WHERE id = $1;`,
      [donorID]
    );

    // check if donor exists
    if (donorCheck.rows.length == 0) {
      return res
        .status(400)
        .json({
          sucess: false,
          message: "Provided body donor does not exist.",
        });
    }

    // check if correct type
    if (donorCheck.rows[0].type_of_account !== "donor") {
      return res.status(400).json({
        sucess: false,
        message: "Provided body user is not type *donor!",
      });
    }

    // check if the reservation exists
    const listingCheck = await client.query(
      `SELECT * FROM reservations r WHERE r.donor_id = $1 AND r.id = $2`,
      [donorID, reservationID]
    );

    if (listingCheck.rows.length == 0) {
      return res.status(400).json({
        sucess: false,
        message:
          "Cannot update. Reservation does not exist! Kindly, create it.",
      });
    }

    // current date
    const CURRENT_TIMESTAMP = new Date(Date.now());
    // if the reservation exists, update it with the status
    const update = await client.query(
      `UPDATE reservations SET status = $1, updated_at = $2 WHERE id = $3`,
      [status, CURRENT_TIMESTAMP, reservationID]
    );

    return res.status(200).json({
      success: true,
      message: "Reservation successfully updated!",
    });
  } catch (error) {
    console.log("Error updating reservation", error);
    res.status(400).json({ success: false, message: error.message });
  }
}

export {
  handleCreateReservation,
  handleDonorReservations,
  handleRecipientReservations,
  handleReservationUpdate,
};
