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

  public pic1Type;
  public pic2Type;

  public pic1Content;
  public pic2Content;

  public collisionState; // not_started, in_progress, finished
  public loadingGif;

  constructor(db: AngularFirestore, private afStorage: AngularFireStorage) {
    this.pic1Uploaded = false;
    this.pic2Uploaded = false;
    this.collisionState = 'not_started';
  }

  ngOnInit() {}

  uploadPhoto(event, num) {
    const randomId = Math.random().toString(36).substring(2);
    const fileName = randomId + event.target.files[0].name;
    const ref = this.afStorage.ref('images/' + fileName);
    const task = ref.put(event.target.files[0]);

    const reader = new FileReader();
    const that = this;
    reader.onload = function(reader_event) {
      if (num === 1) {
        that.pic1Uploaded = true;
        that.pic1Content = reader_event.target.result;
      } else if (num === 2) {
        that.pic2Uploaded = true;
        that.pic2Content = reader_event.target.result;
      }
    };
    reader.readAsDataURL(event.target.files[0]);

  }

  collide() {
    this.collisionState = 'in_progress';
    const that = this;
    const loadingGifNames = ['giphy.gif', 'headbang.gif', 'math.gif', 'willsmith.gif'];
    this.loadingGif = loadingGifNames[Math.floor(Math.random() * loadingGifNames.length)];

    const interval = window.setInterval(() => {
      that.collisionState = 'finished';
        window.clearInterval(interval);
    }, 2500);


  }

}
