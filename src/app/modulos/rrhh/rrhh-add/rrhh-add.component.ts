import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, startWith ,catchError, last, tap} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { PAREJA, HIJOS, EMERGENCIA, CV } from './iconos/icon';
import { HistorialComponent } from './historial/historial.component';
import { Subscription } from 'rxjs/internal/Subscription';
//COMPONENTE
import { DatosHijos  } from 'src/app/componentes/modulos/rrhh/datos-hijos';
//INTERFACE
import { IDatosHijos } from '../../../intefaces/rrhh/hijos.interface';
import { IDatosIdiomas } from '../../../intefaces/rrhh/idiomas.interface';
import { of } from 'rxjs/internal/observable/of';
import { MatDialog} from '@angular/material/dialog'
export class FileUploadModel {
  data!: File;
  state!: string;
  inProgress!: boolean;
  progress!: number;
  canRetry!: boolean;
  canCancel!: boolean;
  sub?: Subscription;
}


@Component({
  selector: 'app-rrhh-add',
  templateUrl: './rrhh-add.component.html',
  styleUrls: ['./rrhh-add.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})

export class RrhhAddComponent implements OnInit {
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  //autocomplete
  myControl = new FormControl();
  options: string[] = ['Perú', 'Venezuela', 'Japón'];
  filteredOptions!: Observable<string[]>;

  constructor(
      private _formBuilder: FormBuilder,
      private iconRegistry: MatIconRegistry,
      private sanitizer: DomSanitizer,
      private _http:HttpClient,
      public dialog: MatDialog
    ) {
      iconRegistry.addSvgIconLiteral('conyuge', sanitizer.bypassSecurityTrustHtml(PAREJA));
      iconRegistry.addSvgIconLiteral('hijos', sanitizer.bypassSecurityTrustHtml(HIJOS));
      iconRegistry.addSvgIconLiteral('emergencia', sanitizer.bypassSecurityTrustHtml(EMERGENCIA));
      iconRegistry.addSvgIconLiteral('cv', sanitizer.bypassSecurityTrustHtml(CV));
    }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  //CLASES
  public datosHijos: DatosHijos[] = [{
    id: 0,
    nom_ape: "",
    fec_nac: "",
    dni: "",
  }];

  // DATOS DE HIJOS
  get hijos() {
    return this.registerForm.get('hijos') as FormArray;
  }
  registerForm = this._formBuilder.group({
    hijos: this._formBuilder.array([])
  })


  agregarHijos() {
    const hijosFormGroup = this._formBuilder.group({
      nom_ape: "",
      fec_nac: "",
      dni: "",
    })
    this.hijos.push(hijosFormGroup);
  }

  removerHijos(indice: number) {
    this.hijos.removeAt(indice);
  }
  
  refrescar() {
    this.hijos.controls.splice(0, this.hijos.length);
  }

  //sassa
  idHijos = 1;
  DATA_HIJOS = [ new IDatosHijos(this.idHijos, '', '' , '')];
  
  addDataHijo(Entity:any){
    this.datosHijos.push({
      id: null,
      nom_ape: "",
      fec_nac: "",
      dni: "",
    });
  }
  
  deleteDataHijo(id:any){
    this.datosHijos.splice(id, 1);
  }

   //--------------------IDIOMA
   idIdioma = 1;
   IDIOMA = [ new IDatosIdiomas(this.idIdioma, '', '')];
   
   public idiomasData: IDatosIdiomas[] = [{
    id: 0,
    idiomas: "",
    nivel: ""
  }];

   addIdioma(Entity:any){
     this.idiomasData.push({
      id: 0,
      idiomas: "",
      nivel: ""
     });
   }
   
   deleteIdioma(id:any){
     this.idiomasData.splice(id, 1);
   }

   //HISTORIAL
   openHistorial() {
    const dialogRef = this.dialog.open(HistorialComponent,{
      width: '100%',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

   

    //--------------------DESCARGAR ARCHIVO
    /*
    @Input() text   = 'Subir CV';
    @Input() param  = 'file';
    @Input() target = 'https://file.io';
    @Input() accept = 'text/*';

    @Output() complete = new EventEmitter<string>();
    fileInformation: any;
    private files: Array<FileUploadModel> = [];

    onSubirCV() {
      const fileUpload:any = document.getElementById('fileUpload') as HTMLInputElement;

      fileUpload.onchange = () => {
        for (let index = 0; index < fileUpload.files.length; index++) {
          const file = fileUpload.files[index];
          this.files.push({
            data: file,
            state: 'in',
            inProgress: false,
            progress: 0,
            canRetry: false,
            canCancel: true
          });
        }
          this.uploadFiles();
      };
      fileUpload.click();
    }

    cancelFile(file: FileUploadModel ) {
      file.sub?.unsubscribe();
  
      this.removeFileFromArray(file);
    }
  
    retryFile(file: FileUploadModel) {
      this.uploadFile(file);
  
      file.canRetry = false;
    }

    private uploadFile(file: FileUploadModel) {
      const fd = new FormData();
      fd.append(this.param, file.data);
  
      const req = new HttpRequest('POST', this.target, fd, {
        reportProgress: true
      });
  
      file.inProgress = true;
      file.sub = this._http.request(req).pipe(
        map(event => {
          switch (event.type) {
                case HttpEventType.UploadProgress:
                      file.progress = Math.round(event.loaded * 100 / event.total);  
                      break;
                case HttpEventType.Response:
                      return event;
          }
        }),
        tap(message => { }),
        last(),
        catchError((error: HttpErrorResponse) => {
          file.inProgress = false;
          file.canRetry = true;
          return of(`${file.data.name} upload failed.`);
        })
      ).subscribe(
        (event: any) => {
          if (typeof (event) === 'object') {
            this.removeFileFromArray(file);
            this.complete.emit(event.body);
          }
        }
      );
    }
 
    private uploadFiles() {
      const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
      fileUpload.value = '';
  
      this.files.forEach(file => {
        this.uploadFile(file);
      });
    }
  
    private removeFileFromArray(file: FileUploadModel) {
      const index = this.files.indexOf(file);
  
      if (index > -1) {
        this.files.splice(index, 1);
      }
    }
    */
}
