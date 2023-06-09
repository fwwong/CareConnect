require('dotenv').config();
const express = require('express');

app.set('view engine', 'ejs');


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

