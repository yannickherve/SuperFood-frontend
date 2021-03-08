import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../auth/services/auth.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {AlertService} from '@full-fledged/alerts';
import {UpdateUserDialogComponent} from '../../../shared/dialogs/update-user-dialog/update-user-dialog.component';

@Component({
  selector: 'app-moderator-profile',
  templateUrl: './moderator-profile.component.html',
  styleUrls: ['./moderator-profile.component.scss']
})
export class ModeratorProfileComponent implements OnInit {
  currentUser: any = {};
  avatarLink: string;
  avatarLinkEnv = environment.avatarLink;
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';

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
        this.avatarLink = 'http://localhost:4000/users/' + data._id + '/avatar';
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
    dialogConfig.width = '450px';

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

  uploadFileEvt(imgFile: any): void {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });
      console.log(imgFile.target.files);
      console.log(imgFile.target);

      // HTML5 FileReader API
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
        };
        console.log(image);

      };
      reader.readAsDataURL(imgFile.target.files[0]);

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }

}
