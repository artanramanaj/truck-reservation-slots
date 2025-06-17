import axios from "axios";

export const baseURL: string =
  "https://timeslot-stream-ha2tva3niq-ey.a.run.app/";

export const sseURL: string =
  "https://timeslot-stream-ha2tva3niq-ey.a.run.app/sse";

const customFetch = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default customFetch;
