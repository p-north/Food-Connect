
// optional: Add reservation expiration

const createReservationTable = `
CREATE TABLE IF NOT EXISTS reservations (
id SERIAL PRIMARY KEY,
recipient_id INTEGER NOT NULL,
donor_id INTEGER NOT NULL,
food_post_id INTEGER NOT NULL,
status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_recipient FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE,
CONSTRAINT fk_donor FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE CASCADE,
CONSTRAINT fk_food_post FOREIGN KEY (food_post_id) REFERENCES food_posts(id) ON DELETE CASCADE
)
`

export default createReservationTable;