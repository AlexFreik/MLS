const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();

// Serve static files from the specified folder
app.use(express.static(path.join(__dirname, './html')));

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('404: Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
