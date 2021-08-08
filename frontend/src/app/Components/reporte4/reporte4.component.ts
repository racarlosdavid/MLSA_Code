import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Services/usuarioService/usuario.service';

@Component({
  selector: 'app-reporte4',
  templateUrl: './reporte4.component.html',
  styleUrls: ['./reporte4.component.css']
})
export class Reporte4Component implements OnInit {

  constructor(private userService:UsuarioService, private router:Router) { 
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/asistentes']);
    }
    
  }

  data:any[];
  ngOnInit(): void {
    this.userService.getAsistentes().subscribe(
      res => {
        console.log(res);
        this.data = res;
      },
      err => {
        //console.log(err);
        console.log(err.respuesta)
        return false;
      }
    );
  }

}