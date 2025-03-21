
import client from "../database/connectDB.js";

async function handleCreateReview(req, res) {
  try {
    // passed on by the AUTH middleware
    // const recipient_id = req.userID;
    const recipient_id = 9;
    // passed on as the params
    const donor_id = req.params.id;
    // comment passed in the body
    const comment = req.body.comment;
    // rating passed in the body
    const rating = req.body.rating;

    // check if the review is not already created by the user for the same donor
    const reviewCheck = await client.query(`SELECT * FROM reviews WHERE recipient_id = $1 AND donor_id = $2`, [recipient_id, donor_id]);
    if(reviewCheck.rows.length != 0){
        return res
        .status(400)
        .json({ sucess: false, message: "Cannot create more than 1 review for same donor." });

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
    if(reCheck.rows[0].type_of_account !== "recipient"){
        return res
        .status(400)
        .json({ sucess: false, message: "User is not type *recipient!" });
    }

    // Ensure that the donor is a valid user and that they are actually a "donor"
    const donorCheck = await client.query(`SELECT type_of_account FROM users WHERE id = $1`, [donor_id]);

    // check if donor exists
    if (donorCheck.rows.length == 0) {
        return res
          .status(400)
          .json({ sucess: false, message: "Donor does not exist." });
    }

    // check if correct type
    if(donorCheck.rows[0].type_of_account !== "donor"){
        return res
        .status(400)
        .json({ sucess: false, message: "Targeted user is not type *donor!" });
    }

    // insert the review into table
    const result = await client.query(`INSERT INTO reviews (recipient_id, donor_id, rating, comment) VALUES ($1, $2, $3, $4)`, [recipient_id, donor_id, rating, comment]);

    return res.status(201).json({sucess: true, message: "Review successfully created"});

    
  } catch (error) {
    console.log("Error in creating new review", error);
    res.status(400).json({ success: false, message: error.message});
  }
}


async function handleGetReviewByID(req, res) {}
async function handleGetAllReviews(req, res) {}
async function handleDeleteReviewByID(req, res) {}

export {
  handleCreateReview,
  handleDeleteReviewByID,
  handleGetAllReviews,
  handleGetReviewByID,
};
