const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const app = new Koa();
const api = Router();
app.use(BodyParser());

const Polls = require('./db/queries/polls');
const Options = require('./db/queries/options');

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

api.post('/polls', async (ctx, next) => {
  try {
    const poll = await Polls.create(ctx.request.body);
    if (poll.length) {
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

app
    .use(api.routes())
    .use(api.allowedMethods());

const PORT = process.env.PORT || 3000;
console.log(`Starting server on port ${PORT}`);
app.listen(PORT);