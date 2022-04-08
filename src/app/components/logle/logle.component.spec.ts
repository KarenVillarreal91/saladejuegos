import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogleComponent } from './logle.component';

describe('LogleComponent', () => {
  let component: LogleComponent;
  let fixture: ComponentFixture<LogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
