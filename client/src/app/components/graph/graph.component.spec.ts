import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GraphComponent} from './graph.component';
import 'd3';
import {NgxChartsModule} from '@swimlane/ngx-charts';

describe('GraphComponent', () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphComponent],
      imports: [
        NgxChartsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
