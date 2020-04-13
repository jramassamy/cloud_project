import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ImageService } from 'src/app/services/imageService/image.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserModel } from 'src/app/models/UserModel';
export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;
  get el64() {
    const num = this.country + this.area + this.prefix + this.line;
    return `+${num}`;
  }
}
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  acceptedMimeTypes = [
    'image/jpeg',
    'image/png'
  ];
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;
  fileDataUri: any;
  errorImageMsg = '';
  selectedFile: File;
  /*firebase*/
  firebase: any;
  phoneNumber = new PhoneNumber();
  verificationCode = '';
  userTag: string;
  userImage: string;
  fileReader = new FileReader();
  canUpdate = false;
  userProfil: UserModel;
  loaded = false;
  showProfil = true;
  showUpdateInputs = false;
  musicToAdd = '';
  soundCloudPattern = "^(https:\/\/soundcloud.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+)$";
  errorSoundcloudUrl = '';
  constructor(private userService: UserService, private route: ActivatedRoute, private imageService: ImageService) {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.userTag = params['userTag'];
      this.loadUser();
    });
    this.onLoadImage();
  }

  onLoadImage() {
    this.fileReader.onload = () => {
      this.fileDataUri = this.fileReader.result;
      const image = new Image();
      image.src = this.fileDataUri;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = image.width / (image.width / 100);
        canvas.height = image.height / (image.height / 100);
        context.drawImage(image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
        this.imageService.uploadImage(canvas.toDataURL()).subscribe(
          (result) => {
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
      };
    };
  }

  ngOnInit() {
  }

  previewFile() {
    const file = this.fileInput.nativeElement.files[0];
    if (file && this.validateFile(file)) {
      this.fileReader.readAsDataURL(this.fileInput.nativeElement.files[0]);
    } else {
      this.errorImageMsg = 'Image .png ou .jpg uniquement';
    }
  }

  validateFile(file) {
    return this.acceptedMimeTypes.includes(file.type);
  }

  loadUser() {
    if (this.userService.isConnected()) {
      if (this.userTag === this.userService.currentUser.userTag) {
        this.userProfil = new UserModel(this.userService.currentUser); // passage par copie & non par référence
        this.canUpdate = true;
        this.checkImageExist();
        this.loaded = true;
      }
    }
    if (!this.canUpdate) {
      // load user;
      this.userService.loadUserByTag(this.userTag).subscribe(
        (user) => {
          this.userProfil = new UserModel(user);
          this.checkImageExist();
          this.loaded = true;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  checkImageExist() {
    const image = new Image();
    const url_image = environment.s3Bucket + this.userProfil.userTag + ".jpg";
    image.onload = () => {
      this.userImage = environment.s3Bucket + this.userProfil.userTag + ".jpg";
    };
    image.onerror = () => {
      this.userImage = './assets/userDefaultImg.svg';
    };
    image.src = url_image;
  }

  updateShowState(value: boolean) {
    this.showProfil = value;
  }
  showUpdate() {
    this.showUpdateInputs = !this.showUpdateInputs;
  }
  sendUpdate() {
    this.userService.updateUser(this.userProfil).subscribe(
      (user) => {
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addMusic() {
    if (this.musicToAdd.match(this.soundCloudPattern)) {
      this.userService.addMusic(this.userProfil.userTag, this.musicToAdd).subscribe(
        (user) => {
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.errorSoundcloudUrl = 'Url incorrecte, désolé 🙄';
    }
  }
}
