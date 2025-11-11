exports.getTribute = (req, res) => {
  const message = "This project is dedicated to The Odin Project — a beacon of open learning, collaboration, and growth. Thank you for shaping developers across the world, including me. 💛";
  res.render('tribute', { user: null, message });
};
