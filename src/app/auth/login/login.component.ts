import { Component, OnInit, NgZone, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { LoginForm } from '../../interfaces/login-form.interface';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit{

  @ViewChild('googleBtn') googleBtn!: ElementRef
  constructor(private router : Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService){

  }
  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    this.googleInit()
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "279908086230-ieh1r85k3g0059vdq09qivnl9fj3s224.apps.googleusercontent.com",
      callback:( response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    console.log({esto: this});
    this.usuarioService.loginGoogle(response.credential)
    .subscribe(resp => {
      // console.log({login: resp});
      this.router.navigateByUrl('/dashboard')      
    })
    console.log("Encoded JWT ID token: " + response.credential);
  }

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  }); 


  login(){

    this.usuarioService.login(this.loginForm.value)
    .subscribe( {
      next: resp =>{
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value+"")
        }else{
          localStorage.removeItem('email');
        }
        console.log(resp);
        // Navegar al dashboard
        this.router.navigateByUrl('/dashboard');
      },error: err => {
        // si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      }
    });
  
  }


}
