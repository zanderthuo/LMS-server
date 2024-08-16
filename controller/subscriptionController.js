import User from '../models/userModel.js';
import crypto from 'crypto';

export const updateSubscription = async (req, res) => {
    try {
        const userId = req.user.id;  // Assuming you have user info in req.user from authentication middleware
        const subscriptionId = crypto.randomBytes(8).toString('hex');

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                subscription: {
                    id: subscriptionId,
                    status: 'active',
                },
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                statusCode: 404,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            statusCode: 200,
            body: updatedUser.subscription,
            message: 'Subscription updated successfully',
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: 'An error occurred while updating the subscription',
        });
    }
};

export const unsubscribe = async (req, res) => {
    try {
        const userId = req.user.id;  // Assuming you have user info in req.user from authentication middleware

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                subscription: {
                    id: null,
                    status: 'inactive',
                },
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                statusCode: 404,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            statusCode: 200,
            body: updatedUser.subscription,
            message: 'Unsubscribed successfully',
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: 'An error occurred while unsubscribing',
        });
    }
};
