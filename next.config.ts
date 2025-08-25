import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    domains: ['randomuser.me'],
  },
};

export default withFlowbiteReact(nextConfig);

