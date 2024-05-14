import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


// It creates a new instance of the Express application. It's like creating a new project or a new file where we will define all the routes and other functionality of our server. We'll be using this 'app' throughout our code to define and access all the routes, middleware, and other functionalities of our server.
const app = express();

dotenv.config();


/* 
The `app.use()` function is used to add middleware to the Express application. 
Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
Middleware functions can perform the following tasks:

1. Execute any code.
2. Make changes to the request and the response objects.
3. End the request-response cycle.
4. Call the next middleware function in the stack.

In this case, we are using `body-parser` to parse incoming request bodies in a middleware before our routes are called.
Here, we are using `bodyParser.json()` and `bodyParser.urlencoded()` to parse JSON and URL-encoded data respectively.
The `limit` option is set to 30mb, which is the maximum amount of data we are willing to accept.
The `extended` option is set to true, which allows for rich objects and arrays to be encoded into the URL-encoded format. 

We are also using `cors()` to enable Cross-Origin Resource Sharing, which allows our server to accept requests from any domain.
*/
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Define Routes
app.use('/posts', postRoutes);
// app.use('/user', userRoutes);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(() => {
  app.listen(PORT, () => console.log(`MongoDB ready. Server is running on port: ${PORT}`))
})
.catch((error) => console.log(error.message));