import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },
  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/ratings
  createRating: {
    body: {
      feedback: {
        rating: Joi.number().required(),
        text: Joi.string().optional()
      },
      settings: {
        activeProject: Joi.string().required(),
        maxSentenceCount: Joi.number().required()
      },
      data: {
        query: Joi.string().required(),
        summary: Joi.string().required(),
        links: Joi.array().required()
      },
      algorithmAndTime: Joi.string().required(),
      algorithm: Joi.string().required(),
      time: Joi.number().required()
    }
  },
  // UPDATE /api/ratings/:ratingId
  updateRating: {
    body: {
      feedback: {
        rating: Joi.number().required(),
        text: Joi.string().optional()
      },
      settings: {
        activeProject: Joi.string().required(),
        maxSentenceCount: Joi.number().required()
      },
      data: {
        query: Joi.string().required(),
        summary: Joi.string().required(),
        links: Joi.array().required()
      },
      algorithmAndTime: Joi.string().required(),
      algorithm: Joi.string().required(),
      time: Joi.number().required()
    },
    params: {
      ratingId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
