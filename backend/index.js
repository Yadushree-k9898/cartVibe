const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const jwtKey = process.env.JWT_SECRET_KEY;
const mongoURI = process.env.MONGO_URI;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      return res.send({
        result: "Something went wrong, please try again later!",
      });
    }
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          return res.send({
            result: "Something went wrong, please try again later!",
          });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "No user found" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  try {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({ result: "Error adding product" });
  }
});

app.get("/products", verifyToken, async (req, res) => {
  try {
    let products = await Product.find();
    if (products.length > 0) {
      res.send(products);
    } else {
      res.send([]);
    }
  } catch (error) {
    res.status(500).send({ result: "Error fetching products" });
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    res.status(500).send({ result: "Error deleting product" });
  }
});

app.get("/product/:id", verifyToken, async (req, res) => {
  try {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "No Results Found" });
    }
  } catch (error) {
    res.status(500).send({ result: "Error fetching product" });
  }
});

app.put("/product/:id", verifyToken, async (req, res) => {
  try {
    let result = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({ result: "Error updating product" });
  }
});

app.get("/search/:key", verifyToken, async (req, res) => {
  try {
    let result = await Product.find({
      $or: [
        { name: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
      ],
    });
    res.send(result);
  } catch (error) {
    res.status(500).send({ result: "Error searching products" });
  }
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ result: "Please add token with header" });
  }

  token = token.split(" ")[1];
  Jwt.verify(token, jwtKey, (err, valid) => {
    if (err) {
      return res.status(401).send({ result: "Please provide a valid token" });
    }
    next();
  });
}

app.listen(5000, () => {
  console.log("server is running at port 5000");
});
