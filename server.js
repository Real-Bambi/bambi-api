import {app} from "./app.js";
import {connectDB} from "./config/db.js";

const PORT = process.env.PORT || 3000;

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
