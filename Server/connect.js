const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ananyaks1905:wZKYwwl1s8aUz8k0@cluster0.2375ute.mongodb.net/Ayush?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, err => err ? console.log(err) :
	console.log('Connected to Ayush database'));


const UserSchema = new mongoose.Schema({
	name:{
        type: String,
        required: true
    },
    abstract:{
        type: Buffer,
        required: true
    },
    domain:{
        type: String,
        required:true
    },
    desc:{
        type: String,
    },
    isApprove:{
        type: Boolean,
        default: false
    },
    rating:{
        type: Number,
    },
    isFunding:{
        type: Boolean,
    },
    comment:{
        type: String,
    }

});


const User = mongoose.model('Project', UserSchema);
User.createIndexes();


const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 2000");
app.use(express.json());
app.use(cors());


app.get('/api/items', async (req, res) => {
	try {
	  const items = await User.find();
	  res.status(200).json(items);
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'Server error' });
	}
  });


app.post("/register", async (req, resp) => {
	try {
		const user = new User(req.body);
		let result = await user.save();
		result = result.toObject();
		if (result) {
			resp.send(req.body);
			console.log(result);
		} 

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});


app.listen(2000);