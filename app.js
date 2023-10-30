const express = require('express');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());

// Calculate Mean
app.get('/mean', (req, res, next) => {
    try {
        let { nums } = req.query;

        // Check if nums is present in the query string
        if (!nums) throw new ExpressError('nums are required.', 400);

        nums = nums.split(',');
        const parsedNums = nums.map((num) => parseInt(num));

        // Find the element that is NaN
        const invalidInput = nums.filter((num) => isNaN(parseInt(num)));

        if (invalidInput.length > 0) {
            throw new ExpressError(`${invalidInput[0]} is not a number.`, 400);
        }

        const mean =
            parsedNums.reduce(
                (accumulator, currentValue) => accumulator + currentValue
            ) / parsedNums.length;
        return res
            .status(200)
            .json({ response: { operation: 'mean', value: mean } });
    } catch (err) {
        next(err);
    }
});

// Error Handler Route
app.use((err, req, res, next) => {
    const message = err.message;
    const status = err.status || 500;
    return res.status(status).json({ error: { message, status } });
});

app.listen(3000, () => {
    console.log('Server running on port 3000.');
});
