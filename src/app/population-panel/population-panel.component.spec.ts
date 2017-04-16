import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationPanelComponent } from './population-panel.component';

describe('PopulationPanelComponent', () => {
  let component: PopulationPanelComponent;
  let fixture: ComponentFixture<PopulationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopulationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
