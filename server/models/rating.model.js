import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const RatingSchema = new mongoose.Schema({
  feedback: {
    rating: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: false
    }
  },
  settings: {
    activeProject: {
      type: String,
      required: true
    },
    maxSentenceCount: {
      type: Number,
      required: true
    },
  },
  data: {
    query: {
      type: String,
      required: true
    },
    summary: {
      type: String,
      required: true
    },
    links: {
      type: Array,
      required: true
    },
  },
  algorithmAndTime: {
    type: String,
    required: true
  },
  algorithm: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
RatingSchema.method({
});

/**
 * Statics
 */
RatingSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<Rating, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<Rating[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Rating
 */
export default mongoose.model('Rating', RatingSchema);
