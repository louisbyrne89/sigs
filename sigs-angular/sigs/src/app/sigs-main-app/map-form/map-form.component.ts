import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImapActions } from '../imap/imap.actions';

@Component({
  selector: 'app-map-form',
  templateUrl: './map-form.component.html',
  styleUrls: ['./map-form.component.css']
})
export class MapFormComponent implements OnInit {

  addressForm = new FormGroup({
    line1: new FormControl(''),
    postcode: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    private imapViewsActions: ImapActions
    ) {
      this.addressForm = fb.group({
          'line1': [null, Validators.required],
          'postcode': [null, Validators.required],
      });
    }

  ngOnInit() {

  }

  submitForm() {
    this.imapViewsActions.onFormSubmit(this.addressForm.value)
  }

}
