import { Component, Input } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { usuarioLogin } from '../../models/cliente.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class FooterComponent {
  usuario!:usuarioLogin;
  @Input() evento!:Observable<any>;
  private eventSubscription!:Subscription;
  ngOnInit():void{
    this.eventSubscription = this.evento.subscribe(() => {
      this.obtenerSesion();
    });
    this.obtenerSesion();
  }

  obtenerSesion(){
    if(sessionStorage.getItem("usr")){
      var usr = sessionStorage.getItem("usr");
      if(usr){
      this.usuario = JSON.parse(usr);
      console.log(this.usuario)}
    }
  }
  constructor(private router: Router, private alert: AlertService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  

  verifyCart():boolean{
    var ret = true;
    if(this.usuario){
      if(this.usuario.tipo == 1){
        ret = false
      }
      else{
        ret = true
      }
    }
    
    return ret;
  }
  verifyUsr():boolean{
    var ret = true;
    if(this.usuario){
      if(this.usuario.tipo == 1 || this.usuario.tipo == 2){
        ret = false
      }
      else{
        ret = true
      }
    }
    
    return ret;
  }
  logout(){
    if(this.usuario){
      sessionStorage.removeItem("usr");
      this.alert.success("Se ha cerrado sesión exitosamente")
      this.router.navigate(['/']);
    }
  }
}
