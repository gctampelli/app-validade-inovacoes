import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageList } from './storage-list';

describe('StorageList', () => {
  let component: StorageList;
  let fixture: ComponentFixture<StorageList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
