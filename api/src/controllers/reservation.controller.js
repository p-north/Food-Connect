import client from "../database/connectDB.js";
import { generateSignedUrls } from "../utils/amazonS3.utils.js";
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

    // get all the reservations for the recipient with related data
    const result = await client.query(
      `SELECT 
        r.id, 
        r.recipient_id, 
        r.donor_id,
        r.food_post_id, 
        r.status, 
        r.created_at,
        r.updated_at,
        fp.title as food_post_title,
        fp.quantity as food_post_quantity,
        fp.description as food_post_description,
        fp.image_url as food_post_image_url,
        fp.dietary_restrictions as food_post_dietary_restrictions,
        fp.location as food_post_location,
        fp.latitude as food_post_latitude,
        fp.longitude as food_post_longitude,
        fp.availability_status as food_post_availability_status,
        fp.expiration_date as food_post_expiration_date,
        fp.tags as food_post_tags,
        fp.available_for as food_post_available_for,
        fp.created_at as food_post_created_at,
        u.id as donor_id_ref,
        u.email as donor_email,
        u.name as donor_name,
        u.type_of_account as donor_type,
        u.is_verified as donor_verified,
        u.created_at as donor_created_at
      FROM reservations r
      LEFT JOIN food_posts fp ON r.food_post_id = fp.id
      LEFT JOIN users u ON r.donor_id = u.id
      WHERE r.recipient_id = $1
      ORDER BY r.created_at DESC;`,
      [recipient_id]
    );

    // Check if recipient has any reservations
    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No reservations found for this recipient",
        reservations: [],
      });
    }
    
    // Transform the flat result into nested objects with signed URLs
    const reservations = await Promise.all(result.rows.map(async (row) => {
      let signedImageUrls = [];
      
      // Generate signed URLs for food post images if they exist
      if (row.food_post_image_url && row.food_post_image_url.length > 0) {
        const signedUrlsResult = await generateSignedUrls(row.food_post_image_url);
        if (signedUrlsResult.success) {
          signedImageUrls = signedUrlsResult.urls;
        }
      }

      return {
        id: row.id,
        recipient_id: row.recipient_id,
        donor_id: row.donor_id,
        food_post_id: row.food_post_id,
        status: row.status,
        created_at: row.created_at,
        updated_at: row.updated_at,
        food_post: {
          id: row.food_post_id,
          user_id: row.donor_id,
          title: row.food_post_title,
          quantity: row.food_post_quantity,
          description: row.food_post_description,
          image_url: signedImageUrls.length > 0 ? signedImageUrls : row.food_post_image_url,
          dietary_restrictions: row.food_post_dietary_restrictions,
          location: row.food_post_location,
          latitude: row.food_post_latitude,
          longitude: row.food_post_longitude,
          availability_status: row.food_post_availability_status,
          expiration_date: row.food_post_expiration_date,
          tags: row.food_post_tags,
          available_for: row.food_post_available_for,
          created_at: row.food_post_created_at
        },
        donor: {
          id: row.donor_id_ref,
          email: row.donor_email,
          name: row.donor_name,
          type_of_account: row.donor_type,
          is_verified: row.donor_verified,
          created_at: row.donor_created_at
        }
      };
    }));

    return res.status(200).json({
      success: true,
      message: "Reservations fetched successfully",
      reservations: reservations,
    });
  } catch (error) {
    console.log("Error fetching recipient reservations", error);
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
