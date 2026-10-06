/** @type {import('next').NextConfig} */
const nextConfig = {
  // The Dockerfile's runtime stage copies .next/standalone; without this the
  // image build fails at that COPY.
  output: "standalone",
};

export default nextConfig;
