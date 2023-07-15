import axios from "axios";

export default async function handler(req, res) {
  try {
    if (req.query) {
      console.log(req.query);
      console.log(req.cookies);
      axios.get("https://poolaeem.com/login/oauth2/code/google", {
        withCredentials: true,
        params: req.query,
      });
    }
    res.status(200).json({ name: "John Doe" });
  } catch (error) {
    console.log(error);
  }
}
