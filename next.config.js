/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // remotePatterns: [
        //     {
        //         protocol: "https",
        //         hostname: "res.cloudinary.com",
        //         port: '',
        //         pathname: '/account123/**'
        //     }
        // ]
        domains: [
            "res.cloudinary.com"
        ]
    }
}

module.exports = nextConfig
