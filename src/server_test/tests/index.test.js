// import { expect, test } from 'vitest';
import { sum, add } from '../js/sum';

// test('덧셈 테스트 1 + 2 = 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

// test('mocking', () => {
//   const mockFn = vi.fn();
//
//   mockFn('a');
//   mockFn(['b', 'c']);
//
//   expect(mockFn).toHaveBeenCalledTimes(2);
//   expect(mockFn).toHaveBeenCalledWith('a');
//   expect(mockFn).toHaveBeenCalledWith(['b', 'c']);
// });

// test('spy on', () => {
//   const calculator = {
//     add: (a, b) => a + b,
//   };
//
//   const spyAdd = vi.spyOn(calculator, 'add');
//
//   const result = calculator.add(2, 3);
//
//   expect(spyAdd).toHaveBeenCalledTimes(1);
//   expect(spyAdd).toHaveBeenCalledWith(2, 3);
//   expect(result).toBe(5);
// });

// test('return the sum of the given two floats.', () => {
//   function getUser(no) {
//     return {
//       no,
//       email: `user_${no}@test.com`,
//     };
//   }
//   expect(add(0.1, 0.2)).toBeCloseTo(0.3);
//   expect(getUser('sample')).toEqual({
//     no: 'sample',
//     email: `user_sample@test.com`,
//   });
// });

test('object', () => {
  const user = {
    no: 1,
    email: 'john.doe@test.com',
    firstName: 'John',
    lastName: 'Doe',
  };
  expect(user).toMatchObject({ firstName: 'John', lastName: 'Doe' });
  expect(user).toHaveProperty('firstName', 'John');
  expect(user).toHaveProperty('lastName');
});
