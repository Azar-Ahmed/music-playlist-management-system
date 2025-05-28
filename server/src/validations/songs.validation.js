import Joi from 'joi';

export const createSongSchema = Joi.object({
  playlistId: Joi.string().required(),
  spotifyId: Joi.string().required(),
  title: Joi.string().required(),
  artist: Joi.string().required(),
  album: Joi.string().required(),
});