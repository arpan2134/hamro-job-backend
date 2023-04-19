/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    API_URL: "http://localhost:8000",
    MAPBOX_ACCESS_TOKEN : 'pk.eyJ1IjoiYXJwYW4xMyIsImEiOiJjbGdubzA4eDkwNm9zM2ltdHBzY2JseWE4In0.oiuapUyMZDuwabpugC79vg'
  },
};

module.exports = nextConfig
