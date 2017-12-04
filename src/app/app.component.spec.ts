import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MatDialogModule, MatIconModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {CommunicatorService} from './services/communicator/communicator.service';
import {SocketIoService} from './services/socket-io/socket-io.service';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MatToolbarModule,
        MatSidenavModule,
        MatDialogModule,
        MatIconModule,
        MatSnackBarModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        CommunicatorService,
        SocketIoService
      ]
    }).compileComponents();
  }));
  it('should create the app', (() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'SuperMileage Server'`, (() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('SuperMileage Server');
  }));
  /*it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));*/
});
