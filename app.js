const express = require('express');

const app = express();

app.use(express.json());

app.get('/mean', (req, res, next) => {
    let { nums } = req.query;
    nums = nums.split(',');
    nums = nums.map((num) => parseInt(num));
    const mean =
        nums.reduce((accumulator, currentValue) => accumulator + currentValue) /
        nums.length;
    return res
        .status(200)
        .json({ response: { operation: 'mean', value: mean } });
});

app.listen(3000, () => {
    console.log('Server running on port 3000.');
});
