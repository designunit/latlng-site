const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
    async redirects() {
        return [
           {
               source: '/murmansk',
               destination: 'https://app.latl.ng/map/FGF6683DZD8R4GE4',
               permanent: true,
           }
        ]
    }
})
