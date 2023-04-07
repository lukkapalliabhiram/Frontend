import axios from "axios";

const BASE_URL = "http://localhost:3500";


export const fetchuser = async () => {
  const response = await axios.get(`${BASE_URL}/userdata`);
  return response.data;
};
