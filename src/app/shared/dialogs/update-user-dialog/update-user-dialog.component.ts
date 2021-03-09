import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../modules/auth/models/user';
import {File} from '../../models/file';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../modules/auth/services/auth.service';
import {FileService} from '../../services/file.service';
import {catchError, map} from 'rxjs/operators';
import { HttpEventType, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import {of} from 'rxjs';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss']
})
export class UpdateUserDialogComponent implements OnInit {
  form: FormGroup;
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  file: File = {
    data: null,
    inProgress: false,
    progress: 0
  };
  currentUser: any = {};
  avatarLink: string;
  avatarLinkEnv = environment.avatarLink;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    private authService: AuthService,
    private fileService: FileService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.form = this.fb.group({
      _id: [data._id, Validators.required],
      name: [data.name, Validators.required],
      email: [data.email, Validators.required],
      // password: [data.password],
      age: [data.age, Validators.compose([
        Validators.minLength(0), Validators.maxLength(3)])
      ],
      phone: data.phone,
      address: [data.address, Validators.required],
      newsletter: data.newsletter
    });
  }

  ngOnInit(): void {
    this.form.controls._id.disable();
    this.getUserData();
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }

  getUserData(): void {
    const userObserver = {
      next: data => {
        this.currentUser = data;
        this.avatarLink = this.avatarLinkEnv + data._id + '/avatar';
      },
      error: error => {
      }
    };
    this.authService.getCurrentUser().subscribe(userObserver);
  }

  // upload image method
  onClick(): void {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        inProgress: false,
        progress: 0
      };
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
    };
  }
  // upload file in api
  uploadFile(): void {
    const formData = new FormData();
    formData.append('avatar', this.file.data);
    this.file.inProgress = true;

    this.fileService.uploadProfileImage(formData).pipe(
      map((event) => {
        console.log(event);
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
        this.getUserData();
      }),
      catchError((error: HttpErrorResponse) => {
        this.file.inProgress = false;
        return of('Upload failed');
      })).subscribe((event: any) => {
        this.getUserData();
    });
  }


}
