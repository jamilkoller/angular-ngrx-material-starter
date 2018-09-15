import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import {AngularFirestore} from '@angular/fire/firestore';


@Component({
  selector: 'anms-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  releaseButler = require('../../../assets/release-butler.png');
  public pic1Uploaded;
  public pic2Uploaded;
  constructor(db: AngularFirestore, private afStorage: AngularFireStorage) {
    this.pic1Uploaded = false;
    this.pic2Uploaded = false;
  }

  ngOnInit() {}

  uploadPhoto(event) {
    const randomId = Math.random().toString(36).substring(2);
    const fileName = randomId + event.target.files[0].name;
    const ref = this.afStorage.ref('images/' + fileName);
    const task = ref.put(event.target.files[0]);

  }
}
