import Shoe from "../models/shoe.model.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.PRIVATEKEY);
