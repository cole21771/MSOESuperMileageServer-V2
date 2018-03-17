import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRecordingComponent } from './save-recording.component';
import {AppMaterialModule} from '../../../app-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('SaveRecordingComponent', () => {
  let component: SaveRecordingComponent;
  let fixture: ComponentFixture<SaveRecordingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveRecordingComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        AppMaterialModule
      ]
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
