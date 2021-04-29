import mongoose from "mongoose";
import Shoe from "./models/shoe.js";
import Comment from "./models/comment.js";

const data = [
  {
    name: "Cloud's Rest",
    image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    name: "Desert Mesa",
    image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    name: "Canyon Floor",
    image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
];

const seedDB = () => {
  //Remove all shoes
  Shoe.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("removed shoes!");
    Comment.deleteMany({}, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("removed comments!");
      // add a few shoes
      data.forEach((seed) => {
        Shoe.create(seed, (err, shoe) => {
          if (err) {
            console.log(err);
          } else {
            console.log("added a shoe");
            //create a comment
            Comment.create(
              {
                text: "This place is great, but I wish there was internet",
                author: "Homer",
              },
              (err, comment) => {
                if (err) {
                  console.log(err);
                } else {
                  shoe.comments.push(comment);
                  shoe.save();
                  console.log("Created new comment");
                }
              }
            );
          }
        });
      });
    });
  });
};

export default seedDB;
