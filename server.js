const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); // this need to present before app require
const app = require('./app');

mongoose
  .connect(
    process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD),
    {},
  )
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.log(err.message);
  });

// console.log(process.env);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
