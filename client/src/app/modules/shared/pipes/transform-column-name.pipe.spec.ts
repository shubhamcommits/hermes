import { TransformColumnNamePipe } from './transform-column-name.pipe';

describe('TransformColumnNamePipe', () => {
  it('create an instance', () => {
    const pipe = new TransformColumnNamePipe();
    expect(pipe).toBeTruthy();
  });
});
