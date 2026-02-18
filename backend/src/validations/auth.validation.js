const { z } = require('zod');

exports.instagramCallbackSchema = z.object({
    body: z.object({
        code: z.string({ required_error: 'Authorization code is required' }),
        state: z.string({ required_error: 'State parameter is required' })
    }),
});
