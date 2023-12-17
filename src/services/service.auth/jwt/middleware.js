const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ error: 'Token is missing' });
    }
  
    // Extract the token from the "Bearer" scheme if present
    const tokenParts = token.split(' ');
    const bearerToken = tokenParts.length === 2 ? tokenParts[1] : null;
  
    if (!bearerToken) {
      return res.status(401).json({ error: 'Invalid token format' });
    }
  
    const decoded = actions.verifyToken(bearerToken);


    if (!decoded) {
        return res.status(401).send('Invalid token.');
      }
    
      // Attach the decoded payload to the request for further use in the route handler
      req.user = decoded;
    
      // Continue to the next middleware or route handler
      next();
    };
    
    module.exports = { authenticateToken };