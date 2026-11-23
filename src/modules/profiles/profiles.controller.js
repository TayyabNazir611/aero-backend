
import { getProfileById, updateProfile } from './profiles.services.js';

export const fetchMyProfile = async (req, res) => {
    try {
        const profile = await getProfileById(req.user.id);

        res.status(200).json({
            success: true,
            data: profile,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const editMyProfile = async (req, res) => {
    try {
        const { fullname } = req.body;
        const updates = {};

        if (fullname !== undefined) updates.fullname = fullname;

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid fields provided for update',
            });
        }

        const profile = await updateProfile(req.user.id, updates);


        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: profile,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

