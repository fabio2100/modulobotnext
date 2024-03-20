export default function handler(req, res) {
    res.status(200).json({ message: `Default Environment Variables
    In general only one .env.local file is needed. However, sometimes you might want to add some defaults for the development (next dev) or production (next start) environment.
    
    Next.js allows you to set defaults in .env (all environments), .env.development (development environment), and .env.production (production environment).
    
    .env.local always overrides the defaults set.' `})
  }