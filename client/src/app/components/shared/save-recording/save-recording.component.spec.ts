import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRecordingComponent } from './save-recording.component';

describe('SaveRecordingComponent', () => {
  let component: SaveRecordingComponent;
  let fixture: ComponentFixture<SaveRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveRecordingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
