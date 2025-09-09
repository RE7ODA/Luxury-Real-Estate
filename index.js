const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const { AuthRoute , ProfileRoute , PropertyRoute , TeamMemberRoute , ContactRoute , ReviewsRoute , DashboardRoute , SearchRoute} = require('./Routes/route');

app.use(AuthRoute)
app.use(ProfileRoute)
app.use(PropertyRoute)
app.use(TeamMemberRoute)
app.use(ContactRoute)
app.use(ReviewsRoute)
app.use(DashboardRoute)
app.use(SearchRoute)

const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(port, () => {console.log(`http://localhost:${port}`);});
  }).catch((err) => {console.log(err);});
