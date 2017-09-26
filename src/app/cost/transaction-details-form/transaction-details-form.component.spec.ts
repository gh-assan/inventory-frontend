import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailsFormComponent } from './transaction-details-form.component';

describe('TransactionDetailsFormComponent', () => {
  let component: TransactionDetailsFormComponent;
  let fixture: ComponentFixture<TransactionDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
