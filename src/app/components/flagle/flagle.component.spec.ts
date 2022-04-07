import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagleComponent } from './flagle.component';

describe('FlagleComponent', () => {
  let component: FlagleComponent;
  let fixture: ComponentFixture<FlagleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlagleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
