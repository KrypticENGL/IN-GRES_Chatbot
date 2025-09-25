import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) =>{
	res.status(200).sendFile(path.join(__dirname, "../client/dist/index.html"));
})

app.listen(port, (error) => 
{
	if (error) { console.log(`Server failed to start ${error}`) }
	else { console.log(`Server running on port ${port}`) }
});
