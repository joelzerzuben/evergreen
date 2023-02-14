import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-edit-raum',
  templateUrl: './edit-raum.component.html',
  styleUrls: ['./edit-raum.component.css']
})
export class EditRaumComponent {
  selectedRoom: string = '';
  dialogRef : MatDialogRef<EditRaumComponent>;

  constructor(
    dialogRef: MatDialogRef<EditRaumComponent>
  ){
    this.dialogRef = dialogRef
  }
  changeValue(room : string) : void{
    this.selectedRoom = room
  }

  edit(){
    this.dialogRef.close({event:'Edit', room: this.selectedRoom });
  }
  

}
