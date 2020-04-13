import { Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-vote',
  templateUrl: './modal-vote.component.html',
  styleUrls: ['./modal-vote.component.css']
})
export class ModalVoteComponent {

  constructor(public dialogRef: MatDialogRef<ModalVoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  close() {
    this.dialogRef.close();
  }

}
