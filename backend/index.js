const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

/* express runs our http server, and cors so that we can call the server from any other origin */

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  /* Taking the username from the request and get a user in chat if it already exists and if not, creates one from scratch*/

  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": "694db77e-0f62-41f0-834d-2769903ab005" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.listen(3001);
