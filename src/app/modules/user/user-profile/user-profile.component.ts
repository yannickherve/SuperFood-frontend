import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {UpdateUserDialogComponent} from '../../../shared/dialogs/update-user-dialog/update-user-dialog.component';
import {AlertService} from '@full-fledged/alerts';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentUser: any = {};
  avatarLink: string;
  avatarLinkEnv = environment.avatarLink;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }
  getUserData(): void {
    const userObserver = {
      next: data => {
        this.currentUser = data;
        this.avatarLink = this.avatarLinkEnv + data._id + '/avatar';
      },
      error: error => {
        this.alertService.danger(error.error.message);
      }
    };
    this.authService.getCurrentUser().subscribe(userObserver);
  }

  editUser(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data =  this.currentUser;
    dialogConfig.width = '750px';
    dialogConfig.height = '100%';

    const dialogRef = this.dialog.open(UpdateUserDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      const updateObserver = {
        next: () => {
          this.getUserData();
          this.alertService.success('Mise à jour réussie');
        },
        error: (error) => {
          this.alertService.danger(error.error.message);
        }
      };
      if (result) {
        this.authService.updateUser(result).subscribe(updateObserver);
      }

    });

  }
}
