import {Component, Input, OnInit} from '@angular/core';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {ConfigService} from '../../../services/config/config.service';
import {View} from '../../../models/interfaces/View';
import {Router} from '@angular/router';
import {MatDialog, MatIconRegistry, MatSidenav, MatSnackBar} from '@angular/material';
import {SocketIoService} from '../../../services/socket-io/socket-io.service';
import {SaveRecordingComponent} from '../save-recording/save-recording.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  public selectedView: View;
  public isRecording = false;

  constructor(private toolbarService: ToolbarService,
              private configService: ConfigService,
              private socket: SocketIoService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.toolbarService.viewChanged.subscribe((view: View) => {
      this.selectedView = view;
    });
  }

  get getViews(): View[] {
    return this.configService.getViews;
  }

  switchTheme() {
    this.toolbarService.switchTheme();
  }

  changeView(view: View) {
    this.selectedView = view;
    this.toolbarService.setView(view);
  }

  switchGraphMode() {
    this.toolbarService.switchGraphMode();
  }

  get isHome() {
    return this.router.url === '/';
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  get isDarkTheme() {
    return this.toolbarService.isDarkTheme;
  }

  startRecording() {
    this.socket.startRecording().then(response => {
      this.isRecording = true;
      this.showDialog(response.error ? response.errorMessage : response.data);
    });
  }

  stopRecording() {
    const dialogRef = this.dialog.open(SaveRecordingComponent, {
      width: '280px',
      height: '270px'
    });

    dialogRef.afterClosed().subscribe(filename => {
      if (filename) {
        this.socket.stopRecording(filename).then(response => {
          if (!response.error) {
            this.isRecording = false;
          }
          this.showDialog(response.error ? response.errorMessage : response.data);
        });
      }
    });
  }

  private showDialog(message: string): void {
    this.snackBar.open(message, undefined, {duration: 3000});
  }
}
