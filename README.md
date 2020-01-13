<p align="center">
  <a href="http://logz.io">
    <img height="150px" src="https://logz.io/wp-content/uploads/2017/06/new-logzio-logo.png">
  </a>
</p>


# return object size max

## Usage
tou can set  env variolas OBJECT_SIZE_MAX_LOOPS to change the default 1000 iteration loop
```javascript

  const { roughObjectSize } = require('rough-object-size');


  const circular = {
      ok: 1,
    };
    const object = {
      circular,
      val: 1,
    };

    circular.object = circular;

    roughObjectSize(object) === 16


  const object = {
    bool: true,
    alon: 1,
    shimon: 'shimon',
    arr: [1],
    another: {
      wow: [1, 2, 3],
    },
  };

  roughObjectSize(object) ===(4 + 8 + 6 * 2 + 8 + 3 * 8);

```

