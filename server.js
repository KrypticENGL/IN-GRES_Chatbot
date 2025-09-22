const express = require("express")
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) =>
{
	res.status(200).send("<h1>Root end-point live</h1>")
})

app.listen(port, (error) => 
{
	if (error) { console.log(`Server failed to start ${error}`) }
	else { console.log(`Server running on port ${port}`) }
});
