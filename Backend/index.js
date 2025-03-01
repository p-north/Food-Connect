import express from 'express';
import foodPostRoutes from "./routes/foodPostRoutes";


const app = express();
const port = process.env.PORT || 3000; // Use environment variable or 3000

app.use(express.json());
app.use('/api/foodPosts', foodPostRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});