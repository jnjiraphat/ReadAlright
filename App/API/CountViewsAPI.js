import axios from "axios";

const countView = (category_id,user_id,reading_id,vocabBox_id) => {
    axios
    .post("http://10.0.2.2:3000/views", {
      numOfView: 1,
      category_id: category_id,
      user_id: user_id,
      reading_id: reading_id,
      vocabBox_id: vocabBox_id,
      is_Active: "1"
    })
    .then(
      (response) => {
        console.log("upload success!!!");
      },
      (error) => {
        console.log(error);
      }
    );
}
export default countView