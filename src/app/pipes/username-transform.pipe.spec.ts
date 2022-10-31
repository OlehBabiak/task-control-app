import { UsernameTransformPipe } from './username-transform.pipe';

describe('UsernameTransformPipe', () => {
  it('create an instance', () => {
    const pipe = new UsernameTransformPipe();
    expect(pipe).toBeTruthy();
  });
});
