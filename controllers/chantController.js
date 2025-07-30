// Example in chantController.js
export const logChant = async (req, res) => {
  const { sessionId, mantraId, duration, mood } = req.body;
  const userId = req.user?._id || null;

  try {
    const chant = await Chant.create({
      userId,
      sessionId,
      mantraId,
      duration,
      mood,
    });
    res.status(201).json(chant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
