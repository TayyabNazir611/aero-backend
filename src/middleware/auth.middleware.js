
import supabase from '../config/supabase.js';

export const authenticateUser = async (req, res, next) => {
  try {
    // Get token from request headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    // Extract token
    const token = authHeader.split(' ')[1];

    // Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    // Attach authenticated user to request
    req.user = data.user;

    // Continue to controller
    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};
