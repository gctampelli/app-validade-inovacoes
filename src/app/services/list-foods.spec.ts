import { TestBed } from '@angular/core/testing';

import { ListFoods } from './list-foods';

describe('ListFoods', () => {
  let service: ListFoods;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListFoods);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
