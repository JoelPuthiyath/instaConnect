const axios = require('axios');
const AppError = require('../utils/AppError');
const logger = require('../config/logger');

const INSTAGRAM_API_BASE = 'https://www.instagram.com';
const INSTAGRAM_GRAPH_BASE = 'https://graph.instagram.com';

exports.getAuthorizationUrl = (state) => {
    const params = new URLSearchParams({
        client_id: process.env.INSTAGRAM_APP_ID,
        redirect_uri: process.env.REDIRECT_URI,
        scope: 'instagram_business_basic',
        response_type: 'code',
        state: state // CSRF protection
    });
    return `${INSTAGRAM_API_BASE}/oauth/authorize?${params.toString()}`;
};

exports.getShortLivedToken = async (code) => {
    try {
        const params = new URLSearchParams({
            client_id: process.env.INSTAGRAM_APP_ID,
            client_secret: process.env.INSTAGRAM_APP_SECRET,
            grant_type: 'authorization_code',
            redirect_uri: process.env.REDIRECT_URI,
            code: code
        });

        // Note: Token exchange usually happens via api.instagram.com, not www.
        const response = await axios.post(`https://api.instagram.com/oauth/access_token`, params);
        return response.data; // { access_token, user_id }
    } catch (error) {
        logger.error('Error fetching short-lived token', error.response?.data || error.message);
        throw new AppError('Failed to retrieve access token from Instagram', 400);
    }
};

exports.getLongLivedToken = async (shortLivedToken) => {
    try {
        const response = await axios.get(`${INSTAGRAM_GRAPH_BASE}/access_token`, {
            params: {
                grant_type: 'ig_exchange_token',
                client_secret: process.env.INSTAGRAM_APP_SECRET,
                access_token: shortLivedToken
            }
        });
        return response.data; // { access_token, token_type, expires_in }
    } catch (error) {
        logger.error('Error fetching long-lived token', error.response?.data || error.message);
        // Fallback to short-lived if exchange fails, or throw?
        // For now, let's treat it as essential for our requirements
        throw new AppError('Failed to exchange for long-lived token', 400);
    }
};

exports.getUserProfile = async (accessToken) => {
    try {
        const fields = 'id,username,account_type,media_count,profile_picture_url,followers_count,biography,website';
        const response = await axios.get(`${INSTAGRAM_GRAPH_BASE}/me`, {
            params: {
                fields: fields,
                access_token: accessToken
            }
        });
        return response.data;
    } catch (error) {
        logger.error('Error fetching user profile', error.response?.data || error.message);
        throw new AppError('Failed to fetch Instagram user profile', 400);
    }
};
