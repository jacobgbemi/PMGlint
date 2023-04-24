const User = require('../model/User');

const deleteUser = async (req, res) => {
    const { userId } = req.params; // Assuming userId is passed as a route parameter
    if (!userId) return res.status(400).json({ 'message': 'User ID is required.' });

    try {
        // Delete the user by ID
        const result = await User.findByIdAndDelete(userId).exec();
        if (!result) return res.status(404).json({ 'message': 'User not found.' });

        res.status(200).json({ 'success': 'User deleted successfully.' });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { deleteUser };