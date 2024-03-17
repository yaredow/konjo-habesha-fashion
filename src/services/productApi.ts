import axios from "axios";
export async function getProductApi() {
  const res = await axios({
    method: "GET",
    url: "http://localhost:3000/api/products",
  });

  return res.data;
}
