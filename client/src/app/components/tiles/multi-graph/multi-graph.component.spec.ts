import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiGraphComponent } from './multi-graph.component';

describe('MultiGraphComponent', () => {
  let component: MultiGraphComponent;
  let fixture: ComponentFixture<MultiGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
