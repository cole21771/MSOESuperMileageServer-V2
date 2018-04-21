import {Component, Input, OnInit} from '@angular/core';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {ConfigService} from '../../../services/config/config.service';
import {View} from '../../../models/interfaces/config/View';
import {Router} from '@angular/router';
import {MatDialog, MatSidenav, MatSnackBar} from '@angular/material';
import {SocketIoService} from '../../../services/socket-io/socket-io.service';
import {SaveRecordingComponent} from '../save-recording/save-recording.component';
import {LogService} from '../../../services/log/log.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  public selectedView: View;
  public isRecording = false;

  constructor(private toolbarService: ToolbarService,
              private configService: ConfigService,
              private socketService: SocketIoService,
              private logService: LogService,
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
    this.socketService.startRecording().then((message) => {
      this.isRecording = true;
      this.showSnackBar(message);
    }).catch(this.showSnackBar.bind(this));
  }

  stopRecording() {
    const dialogRef = this.dialog.open(SaveRecordingComponent, {
      width: '280px',
      height: '270px'
    });

    dialogRef.afterClosed().subscribe(filename => {
      if (filename) {
        this.socketService.stopRecording(filename).then(message => {
          this.isRecording = false;
          this.snackBar.open(message, 'Download', {duration: 8000})
            .onAction().subscribe(() => this.logService.downloadFile({path: './logs/recordings', filename}));

        }).catch(this.showSnackBar.bind(this));
      }
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, undefined, {duration: 3000});
  }
}
