
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
})
export class SongsPage implements OnInit {
  @ViewChild("range", { static: false }) range: IonRange;
  // array of songs
  songs = [
  /*  {
    title: "Soothing piano music",
    subtitle: "Calm Music"
    ,img: "/assets/download2.jpg",
    path: "https://p.scdn.co/mp3-preview/4d17fd655939336133f63f2ef39ec9daf22d8540?cid=2afe87a64b0042dabf51f37318616965"
    },
    {title: "	Dream-Like Music for Working Remotely",
    subtitle: "Beautiful Work Music",
    img: "https://i.scdn.co/image/ab67616d0000b273a8fd563bea38ea78252feda5",
    path: "https://p.scdn.co/mp3-preview/e92a4ef93dcc18123815fe8f610f9c6bb531c894?cid=2afe87a64b0042dabf51f37318616965"
    },
    {title: "Awesome - Lofi Beat",
    subtitle: "Chicago's LowFi",
    img: "https://i.scdn.co/image/ab67616d0000b273ffcc8a3b6472c90f5ee3d92e",
    path: "./assets/songs/song3.mp3"
    },*/
    {title: "	City Night Vibes",
    subtitle: "Chicago's LowFi",
    img: "https://i.scdn.co/image/ab67616d0000b2738a5bd6ba19fc46aaeb122a7c",
    path: "	https://p.scdn.co/mp3-preview/ae22266397950c31868fb64ce5ec101b321f7b43?cid=2afe87a64b0042dabf51f37318616965"
    },
    {title: "Work Music",
    subtitle: "Music for working",
    img: "https://i.scdn.co/image/ab67616d0000b27365f85d351db85e0c24020366",
    path: "	https://p.scdn.co/mp3-preview/2b553177ad28ff64f283cb508b5d0efac8f63bcf?cid=2afe87a64b0042dabf51f37318616965"
    },
    {title: "Tokyo Early Morning Cafe",
    subtitle: "	Lofi Fruits Music",
    img: "https://i.scdn.co/image/ab67616d0000b2732bbda867a7718cd4e933faa3",
    path: "		https://p.scdn.co/mp3-preview/4293c9c040f02a67fdd5f3c8a44114e983a72299?cid=2afe87a64b0042dabf51f37318616965"
    },
    {title: "Up There",
    subtitle: "	Lofi Hip-Hop Beats",
    img: "https://i.scdn.co/image/ab67616d0000b273c08b09f9db70cd7a7721a2f3",
    path: "	https://p.scdn.co/mp3-preview/5444e606fe0c62fbb13d02ab64652c99d2fa67e1?cid=2afe87a64b0042dabf51f37318616965"
    },
    {title: "Empty Streets",
    subtitle: "Lofi Hip-Hop Beats",
    img: "https://i.scdn.co/image/ab67616d0000b27351afdd5e0c068a15029a5f9f",
    path: "		https://p.scdn.co/mp3-preview/d04094a81f62c1e4c10eaa902c16a2b9b0415aec?cid=2afe87a64b0042dabf51f37318616965"
    },
    {title: "Focus & Concentration",
    subtitle: "Music for working",
    img: "https://i.scdn.co/image/ab67616d0000b2738d8718158e3b4237bb13a222",
    path: "		https://p.scdn.co/mp3-preview/bf8482b70cec5ee8cf16922218fdf84029339292?cid=2afe87a64b0042dabf51f37318616965"
    },
    ];
     //Current song details
  currTitle:string;
  currSubtitle:string;
  currImage:string;

  //progress bar value
  progress:number = 0;

  //toggle for play/pause button
  isPlaying:boolean = false;

  //track of ion-range touch
  isTouched:boolean = false;

  //ion range texts
  currSecsText:string;
  durationText:string;

  //ion range value
  currRangeTime:number;
  maxRangeValue:number;

  //Current song
  currSong: HTMLAudioElement;

  //Upnext song details
  upNextImg:string;
  upNextTitle:string;
  upNextSubtitle:string;
  constructor() { }

  ngOnInit() {
  }
  sToTime(t) {
   // this seeks to time. so whatever t is , for example if t is 4 then it will seek time to 00:04 -------------------------- 00:30
   // so whats formatting here is that  eg. if t is 4 
   // then ((4 divide by 60) mod  60 ) --> gives around 0.066666
   // add ":"
   // then ( 4 mode 60 ) is 4
   //then we are formatting via the padZero that we created below
    return this.padZero(parseInt(String((t / (60)) % 60))) + ":" +
      this.padZero(parseInt(String((t) % 60)));
  }
  padZero(v) {
    // to format the timinng placed before and after progress 00:00 ---------------------------------------- 30:00
    // so if value is less than 10s then, show 0 with  value : value 
    return (v < 10) ? "0" + v : v;
  }
  playSong(title, subTitle, img, song) {
    if (this.currSong != null) {
      this.currSong.pause();     //If a song plays,stop that
    }

    //open full player view
    document.getElementById("fullPlayer").style.bottom = "0px";
    //set current song details
    this.currTitle = title;
    this.currSubtitle = subTitle;
    this.currImage = img;

    //Current song audio
    this.currSong = new Audio(song);

    this.currSong.play().then(() => {
      //Total song duration
      this.durationText = this.sToTime(this.currSong.duration);
      //set max range value (important to show proress in ion-range)
      this.maxRangeValue = Number(this.currSong.duration.toFixed(2).toString().substring(0, 5));

      //set upnext song
      //get current song index
      var index = this.songs.findIndex(x => x.title == this.currTitle);
      //if current song is the last one then set first song info for upnext song
      if ((index + 1) == this.songs.length) {
        this.upNextImg = this.songs[0].img;
        this.upNextTitle = this.songs[0].title;
        this.upNextSubtitle = this.songs[0].subtitle;
      }

      //else set next song info for upnext song
      else {
        this.upNextImg = this.songs[index + 1].img;
        this.upNextTitle = this.songs[index + 1].title;
        this.upNextSubtitle = this.songs[index + 1].subtitle;
      }
      this.isPlaying = true;
    })

    this.currSong.addEventListener("timeupdate", () => {

      //update some infos as song plays on
      //if ion-range not touched the do update 
      // here we are talking about the progress bar
      if (!this.isTouched) {

        //update ion-range value
        this.currRangeTime = Number(this.currSong.currentTime.toFixed(2).toString().substring(0, 5));
        //update current seconds text
        this.currSecsText = this.sToTime(this.currSong.currentTime);
        //update progress bar (in miniize view)
        this.progress = (Math.floor(this.currSong.currentTime) / Math.floor(this.currSong.duration));


        //if song ends,play next song
        if (this.currSong.currentTime == this.currSong.duration) {
          this.playNext();
        }
      }
    });
  }

  playNext() {
    // when play next is clicked then 
    // so if currTitle == "City Night" then, findIndex of the current song
    var index = this.songs.findIndex(x => x.title == this.currTitle);
    // add one to index
    // songs.length = 7.
    // then if index+  1  = 7 then then 
    //play first song of the array
    
    if ((index + 1) == this.songs.length) {
      // play song with the details
      this.playSong(this.songs[0].title, this.songs[0].subtitle, this.songs[0].img, this.songs[0].path);
    }
    else {
      //else
      //if it is not then play next song
      var nextIndex = index + 1;
      this.playSong(this.songs[nextIndex].title, this.songs[nextIndex].subtitle, this.songs[nextIndex].img, this.songs[nextIndex].path);
    }
  }
  playPrev() {
    // when play previous is clicked 
    //find index off current song
    var index = this.songs.findIndex(x => x.title == this.currTitle);
 // if index is equal to 0 , basically if the currentSong is the first song of the array
    if (index == 0) {
      //then play the 6th song
      var lastIndex = this.songs.length - 1;
      console.log(lastIndex);
      this.playSong(this.songs[lastIndex].title, this.songs[lastIndex].subtitle, this.songs[lastIndex].img, this.songs[lastIndex].path);
    }
    else {
      //else then pllay the previous song
      var prevIndex = index - 1;
      this.playSong(this.songs[prevIndex].title, this.songs[prevIndex].subtitle, this.songs[prevIndex].img, this.songs[prevIndex].path);
    }
  }
  touchStart() {
    this.isTouched = true;
    this.currRangeTime = Number(this.range.value);
  }

  touchMove() {
    //change the text to seekedToTime
    this.currSecsText = this.sToTime(this.range.value);
  }

  touchEnd() {
    this.isTouched = false;
    this.currSong.currentTime = Number(this.range.value);
    console.log(this.currSong.currentTime)
    // this.currSong.currentTime is basically when u tap on the progress bar , the timing is this.
    this.currSecsText = this.sToTime(this.currSong.currentTime)
    this.currRangeTime = Number(this.currSong.currentTime.toFixed(2).toString().substring(0, 5));

    if (this.isPlaying) {
      ///if song is playing then play current song
      this.currSong.play();
    }
  }
  maximize() {
    // to maximize the fullpaper and put the mini player as bottom (Hidden or basically lower)
    document.getElementById("fullPlayer").style.bottom = "0px";
    document.getElementById("miniPlayer").style.bottom = "-100px";
  }
  minimize() {
    //fullplayer will be gone and miniplayer will be seen 
    document.getElementById("fullPlayer").style.bottom = "-1000px";
    document.getElementById("miniPlayer").style.bottom = "0px";
  }
  pause() {
    // pause current song
    this.currSong.pause();
    this.isPlaying = false;
  }

  play() {
    //play current song
    // if user clicks on play button , then currSong will play
    // and progress bar will move - isPlaying is true
    this.currSong.play();
    this.isPlaying = true;
    console.log(this.currSong)
  }

  cancel() {
    //if user cancels the miniplayer
    document.getElementById("miniPlayer").style.bottom = "-100px";
    // make details empty
    this.currImage = "";
    this.currTitle = "";
    this.currSubtitle = "";
    this.progress = 0;
    this.currSong.pause();
    this.isPlaying = false;
  }
}
