const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "345d4eb0f6ce9e58097e9e0069794d9c61f7be7e": 100,
  "b7f49cfa75ec8adcd7948558f5c2e1dc61c992b0": 50,
  "52c1220d1b43804fb23e4da8dd2e3b03d9c8298c": 75,
};

const passwords ={
  "pass1": "345d4eb0f6ce9e58097e9e0069794d9c61f7be7e",
  "pass2": "b7f49cfa75ec8adcd7948558f5c2e1dc61c992b0",
  "pass3": "52c1220d1b43804fb23e4da8dd2e3b03d9c8298c",
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get("/password/:password", (req,res) => {
  const { password } = req.params;
  const pass = passwords[password]
  if(pass){
    res.status(200).send(pass)
  }else{
    res.status(400).send({message:"Sorry, Wrong Password"});
  }
  //res.send({passAddress});
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, password } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
