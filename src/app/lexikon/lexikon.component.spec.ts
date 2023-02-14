import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LexikonComponent } from './lexikon.component';

describe('LexikonComponent', () => {
  let component: LexikonComponent;
  let fixture: ComponentFixture<LexikonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LexikonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LexikonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
