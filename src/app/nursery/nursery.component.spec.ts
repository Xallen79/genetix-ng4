import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseryComponent } from './nursery.component';

describe('NurseryComponent', () => {
  let component: NurseryComponent;
  let fixture: ComponentFixture<NurseryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
