import bcrypt from 'bcrypt';

let users = [];  // In-memory user storage 

// Register User
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user 
  users.push({ username, password: hashedPassword });
  
  return res.status(201).json({ message: 'User registered successfully' });
};


export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  //find user by username
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Store user in session
  req.session.user = { username: user.username };

  return res.status(200).json({ message: 'Login successful' });
};


export const logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Failed to logout' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};

// Protected Route
export const protectedRoute = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.status(200).json({ message: `Hello, ${req.session.user.username}` });
};
