import { TestBed, async } from '@angular/core/testing';

import { AppModule } from './app.module';

describe('AppModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppModule
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppModule);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
