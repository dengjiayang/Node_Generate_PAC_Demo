'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    const { ctx, app } = this;

    // 1. check user permission
    // 2. generate pac file
    // 3. get pac file info
    // 3. download pac file

    try {
      ctx.validate({
        username: { type: 'string', required: true, },
        customHost: { type: 'string', required: false, },
        customPort: { type: 'int', required: false, min: 0, max: 65535, },
      }, ctx.request.body);
    } catch (error) {
      ctx.body = { code: 403, success: false, message: error };
      return;
    }

    const { username, customHost = ctx.request.ip, customPort = 9999 } = ctx.request.body;
    console.log(username, customHost, customPort);

    let checkResult = await ctx.service.main.checkList({});

    let temp = await ctx.service.main.generatePacFileInfo({ username, customHost, customPort });

    ctx.set('Content-Type', 'application/octet-stream');
    ctx.body = temp;
  }
}

module.exports = MainController;