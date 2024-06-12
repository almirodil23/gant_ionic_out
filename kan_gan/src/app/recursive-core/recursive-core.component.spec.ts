import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveCoreComponent } from './recursive-core.component';

describe('RecursiveCoreComponent', () => {
  let component: RecursiveCoreComponent;
  let fixture: ComponentFixture<RecursiveCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursiveCoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursiveCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
