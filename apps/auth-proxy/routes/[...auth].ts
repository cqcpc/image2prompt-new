import { Auth } from "@auth/core";
import GitHub from "@auth/core/providers/github";
import { eventHandler, toWebRequest, getRouterParam, createError, getQuery } from "h3";

export default eventHandler(async (event) => {
  // 获取路由参数
  const authPath = getRouterParam(event, "auth");
  
  // 如果是根路径请求，返回 404 让 index.ts 处理
  if (!authPath || authPath === "") {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found"
    });
  }
  
  // 排除静态文件请求（如 favicon.ico, robots.txt 等）
  if (authPath && /\.(ico|png|jpg|jpeg|gif|svg|css|js|txt|xml)$/i.test(authPath)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not Found"
    });
  }
  
  // 确保认证路径格式正确
  const validAuthPaths = ['signin', 'signout', 'callback', 'session', 'providers', 'csrf'];
  const pathParts = Array.isArray(authPath) ? authPath : [authPath];
  const mainPath = pathParts[0];
  
  if (!validAuthPaths.includes(mainPath)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Invalid auth endpoint"
    });
  }
  
  return Auth(toWebRequest(event), {
    secret: process.env.AUTH_SECRET,
    trustHost: !!process.env.VERCEL,
    redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL,
    providers: [
      GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
  });
});
