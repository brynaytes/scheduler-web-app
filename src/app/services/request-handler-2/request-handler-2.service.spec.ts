import { TestBed } from '@angular/core/testing';
import { RequestHandler2Service } from './request-handler-2.service';

describe('RequestHandler2Service', () => {
  let service: RequestHandler2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestHandler2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
