import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forEach } from '@angular/router/src/utils/collection';

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

  public pic1Type: string;
  public pic2Type: string;

  public pic1Id;
  public pic2Id;

  public pic1Content;
  public pic2Content;

  private db: AngularFirestore;
  private typesCollection;
  private images;

  constructor(db: AngularFirestore, private afStorage: AngularFireStorage) {
    this.db = db;
    this.pic1Uploaded = false;
    this.pic2Uploaded = false;

    this.typesCollection = db.collection('images');
    this.images = this.typesCollection.valueChanges();
  }

  ngOnInit() {
    const that = this;
    this.images.subscribe(images => {
      console.log(images);
      images.forEach(function(image) {
        if (image.id === that.pic1Id) {
          that.pic1Type = image.type;
        }
        if (image.id === that.pic2Id) {
          that.pic2Type = image.type;
        }
      });
    });
  }

  uploadPhoto(event, num) {
    const randomId = Math.random()
      .toString(36)
      .substring(2);
    const fileName = randomId + event.target.files[0].name;
    const ref = this.afStorage.ref('images/' + fileName);
    const task = ref.put(event.target.files[0]);

    const reader = new FileReader();
    const that = this;
    reader.onload = function(reader_event) {
      if (num === 1) {
        that.pic1Uploaded = true;
        that.pic1Id = fileName;
        that.pic1Content = reader_event.target.result;
      } else if (num === 2) {
        that.pic2Uploaded = true;
        that.pic1Id = fileName;
        that.pic2Content = reader_event.target.result;
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  collide() {}
}
