
import express from 'express';
import path from 'path';

const PORT = process.env.PORT ?? 3000
const app = express()
const __variableOfChoice = path.resolve()


app.use(express.static(path.resolve(__variableOfChoice)))

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
