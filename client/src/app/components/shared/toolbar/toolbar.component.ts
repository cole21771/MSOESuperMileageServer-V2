import {Component, Input, OnInit} from '@angular/core';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {ConfigService} from '../../../services/config/config.service';
import {View} from '../../../models/interfaces/View';
import {Router} from '@angular/router';
import {MatDialog, MatSidenav, MatSnackBar} from '@angular/material';
import {SocketIoService} from '../../../services/socket-io/socket-io.service';
import {SaveRecordingComponent} from "../save-recording/save-recording.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  public selectedView: View;

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
    this.socket.startRecording().then(message => {
      this.showDialog(message);
    });
  }

  stopRecording() {
    const dialogRef = this.dialog.open(SaveRecordingComponent, {
      width: '200px',
      height: '100px'
    });

    dialogRef.afterClosed().subscribe((filename) => {
      this.socket.stopRecording(filename).then(message => {
        this.showDialog(message);
      });
    });
  }

  get isRecording(): boolean {
    return false;
  }

  private showDialog(message: string): void {
    this.snackBar.open(message, undefined, {duration: 2000});
  }
}
