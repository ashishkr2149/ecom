import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";


//REGISTER || METHOD POST
export const registerController = async(req, res) => {
	try{
		const { name, email, password, phone, address, answer } = req.body;
		
		//Validation Checks
		if(!name){
			return res.send({message: "Name is Required"});
		}
		if(!email){
			return res.send({message: "Email is Required"});
		}
		if(!password){
			return res.send({message: "Password is Required"});
		}
		if(!phone){
			return res.send({message: "Phone is Required"});
		}
		if(!address){
			return res.send({message: "Address is Required"});
		}
		if(!answer){
			return res.send({message: "Security Answer is Required"});
		}

		const existingUser = await userModel.findOne({email});
		//Check for existing user;

		if(existingUser){
			return res.status(200).send({
				success: false,
				message: "Email Already Registered, Please Login"
			})
		}

		//Register User
		const hashedPassword = await hashPassword(password);

		//Saving User
		const user = await new userModel({name, email, phone, address, answer, password: hashedPassword}).save();

		res.status(201).send({
			success: true,
			message: "User Registeration Successful",
			user
		})

	}catch(error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in Registeration",
			error
		})
	}
}

//LOGIN || METHOD POST
export const loginController = async(req, res) => {
	try{
		const { email, password } = req.body;

		//Validation Checks
		if(!email || !password){
			return res.status(404).send({
				success: false,
				message: "Invalid Email or Password"
			});
		}

		//Check User
		const user = await userModel.findOne({email});
		if(!user){
			return res.status(404).send({
				success: false,
				message: "User not Registered"
			});
		}


		const match = await comparePassword(password, user.password)
		if(!match){
			return res.status(200).send({
				success: false,
				message: "Invalid Password"
			});
		}

		//TOKEN
		const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
		return res.status(200).send({
				success: true,
				message: "Login Successful",
				user: {
					name : user.name,
					email : user.email,
					phone : user.phone,
					address: user.address,
					role: user.role
				},
				token,
			});


	}catch(error) {
		console.log(error);
		res.status(500).send({
			success: false,
			message: "Error in Login",
			error
		})
	}
}

//FORGOT PASSWORD || METHOD POST
export const forgotPasswordController = async(req, res) => {
	try{
		const { email, answer, newPassword } = req.body;
		if(!email){
			res.status(400).send({message: "Email is Required"})
		}
		if(!answer){
			res.status(400).send({message: "Answer is Required"})
		}
		if(!newPassword){
			res.status(400).send({message: "New Password is Required"})
		}

		//Check
		const user = await userModel.findOne({email,answer})

		//Validation
		if(!user){
			return res.status(404).send({
				success: fasle,
				message: "Wrong Email or Answer"
			})
		}

		const hashed = await hashPassword(newPassword);

		await userModel.findByIdAndUpdate(user._id, {password: hashed});

		res.status(200).send({
			success: true,
			message: "Password Reset Successful"
		})

	} catch(error){
		console.log(error)
		res.status(500).send({
			success: false,
			message: "Something Went Wrong",
			error
		})
	}
}