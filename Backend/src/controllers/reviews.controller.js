import client from "../database/connectDB.js";

async function handleCreateReview(req, res) {
  try {
    // passed on by the AUTH middleware
    const recipient_id = req.userID;
    // const recipient_id = 9;

    // passed on as the params
    const donor_id = req.params.donorID;
    // comment passed in the body
    const comment = req.body.comment;
    // rating passed in the body
    const rating = req.body.rating;

    // check if the review is not already created by the user for the same donor
    const reviewCheck = await client.query(
      `SELECT * FROM reviews WHERE recipient_id = $1 AND donor_id = $2`,
      [recipient_id, donor_id]
    );
    if (reviewCheck.rows.length != 0) {
      return res
        .status(400)
        .json({
          sucess: false,
          message: "Cannot create more than 1 review for same donor.",
        });
    }

    // ensure the reciepient is a valid user and is type  "reciepient"
    const reCheck = await client.query(
      `SELECT type_of_account FROM users WHERE id = $1`,
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

    // insert the review into table
    const result = await client.query(
      `INSERT INTO reviews (recipient_id, donor_id, rating, comment) VALUES ($1, $2, $3, $4)`,
      [recipient_id, donor_id, rating, comment]
    );

    return res
      .status(201)
      .json({ sucess: true, message: "Review successfully created"});
  } catch (error) {
    console.log("Error in creating new review", error);
    res.status(400).json({ success: false, message: error.message });
  }
}

async function handleGetAllReviews(req, res) {
  try {
    const donor_id = req.params.donorID;

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

    // get all reviews form database
    const reviews = await client.query(`SELECT r.id, r.recipient_id, r.donor_id, r.rating, r.comment, u.name AS recipient_name, r.created_at FROM reviews r JOIN users u ON r.recipient_id = u.id WHERE r.donor_id = $1`, [donor_id]);

    if(reviews.rows.length == 0){
        return res
        .status(200)
        .json({ sucess: true, reviews:0 });
    }

    // console.log("Reviews: ", reviews.rows);

    return res
      .status(200)
      .json({ sucess: true, message: reviews.rows});



  } catch (error) {
    console.log("Error fetching all reviews", error);
    res.status(400).json({ success: false, message: error.message });
    return
  }
}
async function handleDeleteReviewByID(req, res) {
    // get the recipient id
    const recipient_id = req.userID;

    // get the review id
    const reviewID = req.params.reviewID;


    // ensure the user is recipient, check for validness


    // ensure the reciepient is a valid user and is type  "reciepient"
    const reCheck = await client.query(
        `SELECT type_of_account FROM users WHERE id = $1`,
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

    // remove the post from database
    const del = await client.query(`DELETE FROM reviews r WHERE r.id = $1 AND  r.recipient_id = $2`, [reviewID, recipient_id]);

    // send the response
    return res
    .status(200)
    .json({ sucess: true, message: "Review sucessfully deleted"});



}

export { handleCreateReview, handleDeleteReviewByID, handleGetAllReviews };
