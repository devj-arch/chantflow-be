import jwt from 'jsonwebtoken'

const authenticate = (req, res, next) => {
  const token = req.cookies.accessToken
  if(!token) return res.status(401).json({ msg: "No token provided" })
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
    req.userId = decoded.userId
    next()
  } catch(err) {
    if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ msg: "Token expired" })
  }
  console.error("Token verification failed:", err)
  return res.status(403).json({ msg: "Invalid token" })
  }
}

export default authenticate
