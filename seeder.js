import Shoe from "./models/shoe.model.js";
import Comment from "./models/comment.model.js";
import { shoes } from "./data/shoes.js";

const seedDB = async () => {
  await Shoe.deleteMany();
  await Comment.deleteMany();

  const createdShoes = await Shoe.insertMany(shoes);

  const newComment = await Comment.create({
    text: "This is the best shoe!",
    author: { username: "Homer" },
  });

  for (const shoe of createdShoes) {
    shoe.comments.push(newComment);
    await shoe.save();
  }
};

export default seedDB;
