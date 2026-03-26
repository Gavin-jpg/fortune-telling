import { onRequest as __api_chat_js_onRequest } from "E:\\Java\\projects\\sm-web\\functions\\api\\chat.js"

export const routes = [
    {
      routePath: "/api/chat",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_chat_js_onRequest],
    },
  ]