import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LexikonDetailComponent } from './lexikon-detail.component';

describe('LexikonDetailComponent', () => {
  let component: LexikonDetailComponent;
  let fixture: ComponentFixture<LexikonDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LexikonDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LexikonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
