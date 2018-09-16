import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forEach } from '@angular/router/src/utils/collection';
import {ApiService} from '../../api.service';

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
  public pic1TypeProb;
  public pic2TypeProb;
  public pic1Recyclable: boolean;
  public pic2Recyclable: boolean;
  public pic1Analysed: boolean;
  public pic2Analysed: boolean;

  public pic1Id;
  public pic2Id;

  public pic1Content;
  public pic2Content;

  public collisionState; // not_started, in_progress, finished
  public loadingGif;
  public collisionResultPic;

  private db: AngularFirestore;
  private typesCollection;
  private images;

  constructor(db: AngularFirestore, private afStorage: AngularFireStorage,
              private  apiService:  ApiService) {
    this.db = db;

    this.reset();

    this.typesCollection = db.collection('images');
    this.images = this.typesCollection.valueChanges();
    this.collisionResultPic = Math.floor(Math.random() * 9) + 1;
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
    const recyclableMaterials = ['paper', 'glass', 'plastic', 'can'];

    reader.onload = function(reader_event) {
      if (num === 1) {
        that.pic1Uploaded = true;
        that.pic1Id = fileName;
        that.pic1Content = reader_event.target.result;

        that.apiService.predictObjectType(reader_event.target.result)
          .subscribe(data => {
            console.log(data);
            that.pic1Analysed = true;
            if (data.hasOwnProperty('payload')) {
              that.pic1Type = data['payload'][0]['displayName'];
              that.pic1TypeProb = Math.floor(data['payload'][0]['classification']['score'] * 100);
              that.pic1Recyclable = (recyclableMaterials.indexOf(that.pic1Type) > -1);
            } else {
              that.pic1Recyclable = false;
            }
          });

      } else if (num === 2) {
        that.pic2Uploaded = true;
        that.pic2Id = fileName;
        that.pic2Content = reader_event.target.result;

        that.apiService.predictObjectType(reader_event.target.result)
          .subscribe(data => {
            console.log(data);
            that.pic2Analysed = true;
            if (data.hasOwnProperty('payload')) {
              that.pic2Type = data['payload'][0]['displayName'];
              that.pic2TypeProb = Math.floor(data['payload'][0]['classification']['score'] * 100);
              that.pic2Recyclable = (recyclableMaterials.indexOf(that.pic2Type) > -1);
            } else {
              that.pic2Recyclable = false;
            }
          });

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

  reset() {
    this.pic1Uploaded = false;
    this.pic2Uploaded = false;

    this.pic1Analysed = false;
    this.pic2Analysed = false;

    this.pic1Recyclable = null;
    this.pic2Recyclable = null;

    this.pic1Type = null;
    this.pic2Type = null;

    this.pic1Content = null;
    this.pic2Content = null;

    this.pic1TypeProb = null;
    this.pic2TypeProb = null;

    this.collisionState = 'not_started';
  }


}
