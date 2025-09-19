import { eventHandler } from "h3";

export default eventHandler(async (event) => {
  return {
    message: "Auth Proxy Server is running",
    status: "ok",
    timestamp: new Date().toISOString(),
    endpoints: {
      signin: "/signin",
      signout: "/signout", 
      callback: "/callback",
      session: "/session",
      providers: "/providers"
    },
    note: "To use authentication, configure GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in .env.local"
  };
});