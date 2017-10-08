const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const Cors = require('@koa/cors');

const app = new Koa();
const api = Router();
app.use(BodyParser());
app.use(Cors());

const Polls = require('./db/queries/polls');
const Options = require('./db/queries/options');
const Votes = require('./db/queries/votes');

api.get('/polls', async (ctx, next) => {
  try {
    const polls = await Polls.get(ctx.request.body);
    if (polls.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: polls
      }
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Something went wrong.'
    }
  }
});

api.get('/polls/:uuid', async (ctx, next) => {
  try {
    const polls = await Polls.get(ctx.params.uuid);
    if (polls.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: polls
      }
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Something went wrong.'
    }
  }
});

api.post('/polls', async (ctx, next) => {
  try {
    const polls = await Polls.create(ctx.request.body);
    if (polls.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: polls
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

api.post('/polls/:poll_id/options/:option_id/votes', async (ctx, next) => {
  try {
    const pollID = ctx.params.poll_id;
    const optionID = ctx.params.option_id;
    const newVote = Object.assign({}, ctx.request.body, {poll_id: pollID, option_id: optionID});
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

app
    .use(api.routes())
    .use(api.allowedMethods());

const PORT = process.env.PORT || 3000;
console.log(`Starting server on port ${PORT}`);
app.listen(PORT);