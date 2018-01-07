const Router = require('koa-router');
const api = Router();
const Polls = require('../db/queries/polls');
const Options = require('../db/queries/options');
const Votes = require('../db/queries/votes');

api.get('/polls', async (ctx, next) => {
  try {
    const polls = await Polls.get(ctx.request.body);
    if (polls.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: polls
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        status: 'not found'
      }
    }
  } catch (err) {
    console.error(err);
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Something went wrong.'
    }
  }
});

api.get('/polls/:uuid', async (ctx, next) => {
  try {
    const polls = await Polls.getByUUID(ctx.params.uuid);
    if (polls.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: polls
      }
    }
  } catch (err) {
    console.error(err);
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Something went wrong.'
    }
  }
});

api.get('/polls/:uuid/results', async (ctx, next) => {
  try {
    const results = await Votes.getResults(ctx.params.uuid);
    if (results.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: results
      }
    }
  } catch (err) {
    console.log('Error: ', err);
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Something went wrong.'
    }
  }
});

api.post('/polls', async (ctx, next) => {
  try {
    const poll = await Polls.create(ctx.request.body);
    if (poll) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: poll
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (err) {
    console.error('Error: ', err);
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

api.get('/polls/:poll_id/options', async (ctx, next) => {
  try {
    const options = await Options.get(ctx.params.poll_id);
    if (options.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: options
      }
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Something went wrong.'
    };
  }
});

api.post('/polls/:poll_id/options', async (ctx, next) => {
  try {
    const pollID = ctx.params.poll_id;
    const newOption = Object.assign({}, ctx.request.body, {poll_id: pollID});
    const option = await Options.create(newOption);
    if (option.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: option
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

api.get('/polls/:poll_id/votes', async (ctx, next) => {
  try {
    const votes = await Votes.getByPollID(ctx.params.poll_id);
    if (votes.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: votes
      }
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Something went wrong.'
    };
  }
});

/**
 * Client Vote.
 */
api.post('/polls/:poll_id/options/:option_id/votes', async (ctx, next) => {
  const clientIp = ctx.request.ip;
  const userAgent = ctx.request.header['user-agent'];
  
  const pollID = ctx.params.poll_id;
  const optionID = ctx.params.option_id;
  const newVote = Object.assign({}, ctx.request.body, {
    poll_id: pollID,
    option_id: optionID,
    ip_address: clientIp,
    user_agent: userAgent
  });
  try {
    const hasVoted = await Votes.hasVoted(pollID, clientIp, userAgent)
    if (hasVoted) {
      ctx.status = 403;
      ctx.body = {
        status: 'error',
        message: 'You have already voted'
      }
      return;
    }

    const votes = await Votes.create(newVote);
    if (votes.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: votes
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

module.exports = api;