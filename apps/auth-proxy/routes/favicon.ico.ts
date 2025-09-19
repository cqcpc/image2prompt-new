import { eventHandler, sendRedirect } from "h3";

export default eventHandler(async (event) => {
  // 重定向到 Next.js 应用的 favicon
  return sendRedirect(event, "http://localhost:12883/favicon.ico", 301);
});