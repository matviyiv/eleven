import * as MasterHelper from '../utils/MasterHelper';

describe('MasterHelper', () => {
  it('should be even data', () => {
    expect(MasterHelper.isEven(new Date())).toBe('even');
  });
});