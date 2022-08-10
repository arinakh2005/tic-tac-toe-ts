import express from 'express'
import path from 'path'

const PORT = 3000;
const app = express();
const __dirname = path.resolve();


app.use(express.static(path.resolve(__dirname, 'built')));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
