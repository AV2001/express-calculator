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

// Calculate Median
app.get('/median', (req, res, next) => {
    try {
        let { nums } = req.query;
        if (!nums) throw new ExpressError('nums are required.', 400);

        nums = nums.split(',');
        const parsedNums = nums.map((num) => parseInt(num));

        const invalidInput = nums.filter((num) => isNaN(parseInt(num)));

        if (invalidInput.length > 0) {
            throw new ExpressError(`${invalidInput[0]} is not a number.`, 400);
        }

        // If length of nums is odd, get the middle number
        if (parsedNums.length % 2 == 1) {
            const median = parsedNums[Math.floor(parsedNums.length / 2)];
            return res
                .status(200)
                .json({ response: { operation: 'median', value: median } });
        } else {
            const length = parsedNums.length;
            const median =
                (parsedNums[length / 2 - 1] + parsedNums[length / 2]) / 2;
            return res
                .status(200)
                .json({ error: { operation: 'median', value: median } });
        }
    } catch (err) {
        next(err);
    }
});

// Calculate Mode
app.get('/mode', (req, res, next) => {
    try {
        let { nums } = req.query;

        if (!nums) throw new ExpressError('nums are requied.', 400);

        nums = nums.split(',');
        const parsedNums = nums.map((num) => parseInt(num));

        const invalidInput = nums.filter((num) => isNaN(parseInt(num)));

        if (invalidInput.length > 0) {
            throw new ExpressError(`${invalidInput[0]} is not a number.`, 400);
        }

        const count = {};

        // Count occurrences of each number
        for (let num of parsedNums) {
            count[num] = (count[num] || 0) + 1;
        }

        // Find the most repeated num
        let maximum = parsedNums[0];
        for (let num in count) {
            if (count[num] > maximum) {
                maximum = count[num];
            }
        }

        // Collect all numbers equal to the maximum number
        let modes = [];
        for (let num in count) {
            if (count[num] === maximum) {
                modes.push(num);
            }
        }

        // Return one mode or multiple based on the length of the modes array
        modes = modes.length === 1 ? modes[0] : modes;

        return res
            .status(200)
            .json({ response: { operation: 'mode', value: modes } });
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

module.exports = app;
