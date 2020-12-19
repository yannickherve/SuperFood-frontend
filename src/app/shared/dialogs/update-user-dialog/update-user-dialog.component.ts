import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../modules/auth/models/user';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss']
})
export class UpdateUserDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }

}
