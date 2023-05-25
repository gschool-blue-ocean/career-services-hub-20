const express = require('express');
const app = express();
const port = 6000;

// This was meant for automoatic testing in deployment but didn't end up getting used. Might be useful though!

app.get('/run-tests', (req, res) => {

    const testResults = runTests();
    res.json({ success: testResults });
    });

app.listen(port, () => {
    console.log(`Test runner listening at ${port}`)
})