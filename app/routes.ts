import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("syugyou/", "./routes/syugyou.tsx", [
    route(":id", "./routes/syugyou.$id.tsx"),
  ]),
  route("syugyou2/", "./routes/syugyou2.tsx", [
    route(":id", "./routes/syugyou2.$id.tsx"),
  ]),
] satisfies RouteConfig;