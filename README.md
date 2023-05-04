express-decorator-validation
============================

Idempotency middleware for [Express](https://expressjs.com) to avoid duplicate requests processing of non-idempotency verbs of HTTP. Like PUT and POST, for example.

Getting started
---------------

Install the dependency.
```bash
npm install express-idempotency-cache --save
```

Integrate the middleware in your Express initialization

```javascript
const idempotency = require('express-idempotency-cache');

const config = {
    adapter: 'redis' // "redis" or "memory"
    redis  : {
        hostname: 'url-to-your-redis-instalation.yourdomain.com',
        port    : 'port for your redis instalation' // optional
    },
    ttl: '86400' // If not specified, default is 24 hours
};

// ...express initialization
app.use(express.json()) // JSON body config SHOULD be declared BEFORE
app.use(idempotency.init(idempotencyConfig))
```

Add idempotency config to your routes
```javascript
const idempotency = require('express-idempotency-cache');

app.post('/some-route', idempotency.set(500), function(request, response) {

    // Do your code here...

    // Send response
    response.json(yourResponseHere)
});
```

MIT License
-----------

Copyright (c) 2023 Leonardo Thibes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
