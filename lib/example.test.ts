import { describe, it, expect } from 'vitest';
import fc from 'fast-check';

describe('Example Test Suite', () => {
  it('should pass a basic unit test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should pass a basic property test', () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (a, b) => {
        return a + b === b + a; // Addition is commutative
      }),
      { numRuns: 100 }
    );
  });
});
