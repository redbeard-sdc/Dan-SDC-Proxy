const nr = require('newrelic');
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Dmitri Reviews Service
app.all("/api/*", (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-18-234-162-20.compute-1.amazonaws.com/"
  });
});

// Bevan Location Service
app.all("/location/*", (req, res) => {
  proxy.web(req, res, {
    target: "http://loadballoc-231b959af5018acb.elb.us-east-2.amazonaws.com/"
  });
});

// Dan Booking Service
app.all("/prices/*", (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-3-17-179-228.us-east-2.compute.amazonaws.com/"
  });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
