import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { ImapActions } from '../imap/imap.actions';

@Component({
  selector: 'app-sigs-main',
  templateUrl: './sigs-main.component.html',
  styleUrls: ['./sigs-main.component.css']
})
export class SigsMainComponent implements OnInit {
  @select(["views", "sigsMainApp", "imap", "stage"]) stageObs: Observable<number>;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.router.navigate(['/analysis'])
  }

}
