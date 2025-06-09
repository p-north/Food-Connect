const createReviewsTable = `CREATE TABLE IF NOT EXISTS reviews (
id SERIAL PRIMARY KEY,
recipient_id INTEGER NOT NULL,
donor_id INTEGER NOT NULL,
rating INTEGER CHECK (rating BETWEEN 1 AND 5) NOT NULL,
comment TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_recipient FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE,
CONSTRAINT fk_donor FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE CASCADE
);`;

export default createReviewsTable;

