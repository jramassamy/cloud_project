import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {

  doc1: HTMLElement;
  doc2: HTMLElement;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  goTo(id: string) {
    if (!this.doc1) {
      this.doc1 = document.getElementById(id);
      this.doc1.classList.remove('hidden');
    } else {
      this.doc1.classList.add('hidden');
      this.doc2 = document.getElementById(id);
      this.doc2.classList.remove('hidden');
      this.doc1 = this.doc2;
    }
  }


}

