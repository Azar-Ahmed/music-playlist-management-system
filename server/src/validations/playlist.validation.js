import Joi from 'joi';

export const createPlaylistSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().optional(),
  songs: Joi.array().optional(),
});

export const updatePlaylistSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().optional(),
  songs: Joi.array().optional(),
}).min(1);
