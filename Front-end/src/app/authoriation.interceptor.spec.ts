import { TestBed } from '@angular/core/testing';

import { AuthoriationInterceptor } from './authoriation.interceptor';

describe('AuthoriationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthoriationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthoriationInterceptor = TestBed.inject(AuthoriationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
