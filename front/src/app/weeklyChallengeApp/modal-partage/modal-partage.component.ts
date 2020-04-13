import { Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-modal-partage',
  templateUrl: './modal-partage.component.html',
  styleUrls: ['./modal-partage.component.css']
})
export class ModalPartageComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalPartageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {

  }

}
