import express from 'express';

const app = express();

class MyService {}

function Injectable(constructor: Function) {
  console.log(constructor.prototype.constructor);
}

@Injectable
class Service {
  constructor(public myService: MyService) {}
}

app.listen(9000, () => {
  console.log('server init');
});
