const crypto = require('crypto');
const User = require('../models/User');
const instagramService = require('../services/instagram.service');
const tokenService = require('../services/token.service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const logger = require('../config/logger');

exports.getInstagramUrl = catchAsync(async (req, res, next) => {

    const state = crypto.randomBytes(16).toString('hex');

    // Store state in a cookie to verify later
    res.cookie('oauth_state', state, {
        httpOnly: true,
        secure: true, // Required for SameSite=None
        sameSite: 'None', // Required for cross-origin (ngrok -> localhost)
        maxAge: 10 * 60 * 1000 // 10 minutes
    });

    const authUrl = instagramService.getAuthorizationUrl(state);
    res.status(200).json({
        status: 'success',
        authUrl
    });
});

exports.instagramCallback = catchAsync(async (req, res, next) => {
    const { code, state } = req.body;
    const storedState = req.cookies?.oauth_state || req.headers['x-oauth-state']; // Allow header for dev flexibility if needed, but cookie preferred.

    if (!state || state !== storedState) {
        return next(new AppError('Invalid state parameter. Possible CSRF attack.', 403));
    }

    // Clear state cookie
    res.clearCookie('oauth_state', {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });

    // 1. Exchange code for short-lived token
    const shortTokenData = await instagramService.getShortLivedToken(code);
    console.log(shortTokenData, "shortTokenData")

    // 2. Exchange for long-lived token
    const longTokenData = await instagramService.getLongLivedToken(shortTokenData.access_token);
    console.log(longTokenData, "longTokenData")

    // 3. Fetch User Profile
    const instagramProfile = await instagramService.getUserProfile(shortTokenData.access_token); // Use short token for profile or long? 
    // Graph API documentation says simple access_token works. Long-lived is better for storing.
    // Actually, usually you use the token you just got. 
    // Let's use the long lived token for profile fetching to ensure it works and we verify it.
    // Wait, getLongLivedToken returns { access_token, token_type, expires_in }

    console.log(instagramProfile, "instagramProfile")

    // Re-fetch profile with long-lived token to be sure
    const userProfile = await instagramService.getUserProfile(longTokenData.access_token);
    console.log(userProfile, "userProfile")

    // 4. Check Account Type
    if (userProfile.account_type !== 'BUSINESS' && userProfile.account_type !== 'CREATOR') {
        return next(new AppError('Only Professional (Business or Creator) Instagram accounts are allowed.', 403));
    }

    // 5. Find or Create User
    let user = await User.findOne({ 'instagram.id': userProfile.id });

    if (!user) {
        user = await User.create({
            name: userProfile.username, // Fallback name
            role: 'user',
            profilePic: userProfile.profile_picture_url,
            instagram: {
                id: userProfile.id,
                username: userProfile.username,
                account_type: userProfile.account_type,
                access_token: longTokenData.access_token,
                token_expiry: new Date(Date.now() + longTokenData.expires_in * 1000),
                followers_count: userProfile.followers_count,
                media_count: userProfile.media_count,
                biography: userProfile.biography,
                website: userProfile.website
            }
        });
    } else {
        // Update existing user
        user.instagram = {
            ...user.instagram,
            username: userProfile.username,
            account_type: userProfile.account_type,
            access_token: longTokenData.access_token,
            token_expiry: new Date(Date.now() + longTokenData.expires_in * 1000),
            followers_count: userProfile.followers_count,
            media_count: userProfile.media_count,
            biography: userProfile.biography,
            website: userProfile.website
        };
        user.profilePic = userProfile.profile_picture_url;
        await user.save();
    }

    // 6. Generate Session Token
    tokenService.createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        secure: true, // Match creation settings
        sameSite: 'None' // Match creation settings
    });
    res.status(200).json({ status: 'success' });
};
