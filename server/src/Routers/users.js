import express from "express";
import User from "../User.model.js";
import tokenBalanceSchema from "../User.model.js";
import authenticateToken from "./authToken.js";
import jwt from "jsonwebtoken";



const router = express.Router();
router.use(express.json());




router.get("/", (req, res) => {
    res.send("User Auth");
});

router.post("/register", async (req, res) => {

    try {
        const { username, password } = req.body;
    
      
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(409).json({ message: 'Username already exists.' });
        }

        const newUser = new User({username: `${username}`, password: `${password}`, USDBalance: 1000.00, tokenBalances: [] });

        newUser.save()
        .then((user) => {
            console.log('User created:', user);
            res.status(200).send('User created')
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            res.status(500).send('Error creating user')
        });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
});

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });

      //PLACEHOLDER PASSWORD TESTING*****
      
  
      
      if (!user || password != user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Create a JWT token
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
        expiresIn: '1h',
      });
  
      
      res.status(200).json({ message: 'Authentication successful!', token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get("/portfolio", authenticateToken, async (req, res) => {
    
    const userID = req.user.userId;

    //Will always find user, since it would have failed authenticate token if wasn't valid in DB.
    const user = await User.findById(userID);

    user.tokenBalances.forEach(element => {
      console.log("tokenCA", element.tokenCA);
      console.log("tokenName", element.tokenName);
      console.log("balance", element.balance);
      console.log();
    });

    console.log(`${user.username} is logged in and balance is: ${user.USDBalance}`);
    res.json({
      username: user.username,
      USDBalance: user.USDBalance,
      tokens: user.tokenBalances
    });

    router.post("/portfolio/buy", authenticateToken, async (req, res) => {
      const user = await User.findById(userID);

      try{
      const {stockTicker, balance} = req.body;

      const numericBalance = parseInt(balance);

      let tokenReq;

      await fetch(`http://localhost:3001/contract/${stockTicker}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        tokenReq = data;
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });


      if (!tokenReq){
        return res.status(404).json({message: "Stock not found"});
      }

      const purchaseCost = tokenReq.stockPrice * numericBalance;

      if (user.USDBalance < purchaseCost) {
        return res.status(403).json({ message: 'Insufficient balance' });
      }

      let existingToken = false;

      user.tokenBalances.forEach((element, index) => {
        if(element.stockTicker === stockTicker){
          existingToken = true;
        }
      });

      if (existingToken != false) {
          await User.findOneAndUpdate(
          { _id: user._id, "tokenBalances.stockTicker": stockTicker },
          {
            $inc: {
              "tokenBalances.$.balance": numericBalance,
            },
          },
          { new: true } 
        );

      }
      else{
        const newToken = { stockTicker: stockTicker, balance: numericBalance };
        await user.tokenBalances.push(newToken);
        
      }

      user.USDBalance -= purchaseCost;

      await user.save();
 
      res.status(200).json({ message: 'Stock purchase successful' }); 
    } 
    catch(error){
      console.error('Error during token purchase:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
    
    
    });
    
    
    router.post("/portfolio/sell", authenticateToken, async (req, res) => {
      
      const user = await User.findById(userID);

      try{
      const {stockTicker, balance} = req.body;

      const numericBalance = parseInt(balance);

      const tokenBalance = user.tokenBalances.find((element) => element.stockTicker === stockTicker);

      let tokenReq = await fetch(`http://localhost:3001/contract/${stockTicker}`);
      if (!tokenReq.ok) {
        throw new Error('Network response was not ok');
      }
      const tokenData = await tokenReq.json();


      if (!tokenBalance) {
        return res.status(400).json({ message: 'Token not found' });
      }

      if (tokenBalance.balance < numericBalance) {
        return res.status(400).json({ message: 'Insufficient Balance' });
      }

      if (tokenBalance.balance === numericBalance) {
        await User.updateOne(
          { _id: user._id },
          { $pull: { tokenBalances: { stockTicker: stockTicker } } }
        );
        
      }
      else{
        await User.updateOne(
          { _id: user._id, 'tokenBalances.stockTicker': stockTicker },
          { $inc: { 'tokenBalances.$.balance': -numericBalance } }
        );
      }

      const sellCost = tokenData.stockPrice * numericBalance;

      user.USDBalance += sellCost;

      await user.save();

      res.send("Token sale successful"); 


      }
      catch(error){
        console.error('Error during token sell:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  })

export default router;

