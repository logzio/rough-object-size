const { roughObjectSize } = require('..');

describe('roughSize', () => {
  it('roughSize all', () => {
    const object = {
      bool: true,
      alon: 1,
      shimon: 'shimon',
      arr: [1],
      another: {
        wow: [1, 2, 3],
      },
    };

    expect(roughObjectSize(object)).toBe(4 + 8 + 6 * 2 + 8 + 3 * 8);
  });

  it('roughSize circular', () => {
    const circular = {
      ok: 1,
    };
    const object = {
      circular,
      val: 1,
    };

    circular.object = circular;
    expect(roughObjectSize(object)).toBe(16);
  });

  it('should not pass max loops', () => {
    const maxCount = 10000 + 1;
    const object = {};

    Array(maxCount)
      .fill(null)
      .forEach((item, i) => {
        object[i] = i;
      });
    expect(roughObjectSize(object)).toBe(Infinity);
  });
});
