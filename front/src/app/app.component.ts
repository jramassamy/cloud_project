import { Component, OnInit, Renderer2, HostListener } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification/authentification.service';
import { UserService } from 'src/app/services/user/user.service';
import { ReplaySubject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  mobileMenuOpened = false;
  mainContent: HTMLElement;
  content: HTMLElement;
  openHeader: HTMLElement;
  menuMobile: HTMLElement;
  innerWidth: Number;
  _innerWidthSource = new ReplaySubject<Number>(1);
  public _innerWidth$ = this._innerWidthSource.asObservable();
  public ngOnInit(): void {
    this.mainContent = document.getElementById('mainContent');
    this.openHeader = document.getElementById('openHeader');
    this.content = document.getElementById('content');
    this.menuMobile = document.getElementById('menuMobile');
    // this._innerWidthSource.next(window.innerWidth);
  }

  constructor(private authServ: AuthentificationService, private renderer: Renderer2,
    public user: UserService) {
    if (this.authServ.loggedIn()) { // source page, reload on refresh.
      this.authServ.initUser();
    }
    this._innerWidth$.subscribe(
      innerWidth => {
        this.innerWidth = innerWidth;
        if (this.innerWidth <= 1000) {
          if (!this.mobileMenuOpened) {
            this.openHeader.style.display = 'flex';
          }
        }
        if (this.innerWidth > 1000) { // petit reset des familles
          this.openHeader.style.display = 'none';
          this.mobileMenuOpened = false;
          this.menuMobile.classList.remove('translateOnShowMenu');
          this.mainContent.classList.remove('mainOpacity');
        }
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this._innerWidthSource.next(event.currentTarget.innerWidth);
  }

  toggleMenu() {
    if (!this.menuMobile.classList.contains('translateOnShowMenu')) {
      this.openHeader.style.display = 'none';
      this.mainContent.classList.add('mainOpacity');
      this.mainContent.classList.add('overFlowHidden');
      this.menuMobile.classList.add('translateOnShowMenu');
      this.content.classList.add('translateOnShowMenu');
    } else {
      this.mainContent.classList.remove('mainOpacity');
      this.menuMobile.classList.remove('translateOnShowMenu');
      this.content.classList.remove('translateOnShowMenu');
      setTimeout(() => {
        this.mainContent.classList.remove('overFlowHidden');
        this.openHeader.style.display = 'flex';
      }, 300);
    }
    this.mobileMenuOpened = !this.mobileMenuOpened;
  }

  logout(isMobile: boolean) {
    if (isMobile) {
      this.toggleMenu();
    }
    this.authServ.logoutUser();
  }

}
