import {  Component,NgModule, ElementRef,Inject,Injectable,Input,OnDestroy,OnInit,Optional,Self,ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Cuenta } from '../../../../intefaces/maestro/cuentas_bancarias.interface';
import {FormControl, FormGroup, NgControl,Validators,  AbstractControl, ControlValueAccessor, FormBuilder, FormsModule} from '@angular/forms';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import { MatTable } from '@angular/material/table';
import {MatAccordion} from '@angular/material/expansion';

export interface ProveedoresList {
  id: number;
  ruc_dni: number;
  razon_name: string;
};


@Component({
  selector: 'app-proveeedor',
  templateUrl: './proveeedor.component.html',
  styleUrls: ['./proveeedor.component.css']
})


export class ProveeedorComponent implements OnInit {
//data se lleva ProveedoresComponents
  constructor(
    private elementRef: ElementRef,
    
    public dialogRef: MatDialogRef<ProveeedorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProveedoresList) {
      
    }
    
    //cuenta_bancaria
    ngOnInit(){
      this.deleteCuenta(1);
    }
    
    id = 1;

    
    CUENTAS = [ new Cuenta(this.id, '', 0 , 0, '','')];
    
    isUpdate = null;
    addCuenta(Entity:any){
      if(this.isUpdate != null){
        this.update(this.TempEdit, Entity)
      }else{
        this.id +=1;
        const cuentaEntry = new Cuenta(Entity.id, Entity.entidad, Entity.nro_cuenta, Entity.CCI, Entity.tipo_cuenta, Entity.moneda);
        this.CUENTAS.push(cuentaEntry);
        this.resetCuenta(Entity);
      }
    }
    
    
    TempEdit = null;
    update(Model:any, Entity:any){
      for(let i = 0; i < this.CUENTAS.length; ++i){
        if (this.CUENTAS[i].id === Model.id){
          Entity.CUENTAS[i].entidad = Entity.entidad;
          Entity.CUENTAS[i].nro_cuenta = Entity.nro_cuenta;
          Entity.CUENTAS[i].CCI = Entity.CCI;
          Entity.CUENTAS[i].tipo_cuenta = Entity.tipo_cuenta;
          Entity.CUENTAS[i].moneda = Entity.moneda;
        }
      }
      
      this.resetCuenta(Entity);
      this.isUpdate = null;
    }
      deleteCuenta(id:any){
        for(let i=0; i < this.CUENTAS.length; ++i){
          if(this.CUENTAS[i].id === id){
            this.CUENTAS.splice(i,1);
          }
        }
      }
      
      EditCuenta(Entity:any, Model:any){
        Model.entidad = Entity.entidad;
        Model.nro_cuenta = Entity.nro_cuenta;
        Model.CCI = Entity.CCI;
        Model.tipo_cuenta = Entity.tipo_cuenta;
        Model.moneda = Entity.moneda;
      }

      resetCuenta(Entity :any){
        Entity.entidad = '';
        Entity.nro_cuenta = 0;
        Entity.CCI = 0;
        Entity.tipo_cuenta = '';
        Entity.moneda = '';
      }
    
    


    //CHECK RADIO
  onClose(): void {
    this.dialogRef.close();
  }

  impuestosAsociados!: string;
  impuestos: string[] = ['IGV', 'ISC', 'Servicios', 'Otros'];

  tiposPagos!: string;
  pagos: string[] = ['Tarjeta de Crédito', 'Transferencia', 'Efectivo', 'Cheque','Otros'];

  //EXPANSION DE DIRECCION Y DATOS PERSONALES
  @ViewChild(MatAccordion) accordion!: MatAccordion;
step = 0;

setStep(index: number) {
  this.step = index;
}

nextStep() {
  this.step++;
}

prevStep() {
  this.step--;
}

//EMAIL
email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  //TELEFONO
  form: FormGroup = new FormGroup({
    tel: new FormControl(new MyTel('', '', ''))
  });
}

/** Data structure for holding telephone number. */
export class MyTel {
  constructor(
    public area: string,
    public exchange: string,
    public subscriber: string
  ) {}

}

/** TELEFONO Custom `MatFormFieldControl` for telephone number input. */
@Component({
  selector: 'example-tel-input',
  templateUrl: 'example-tel-input-example.html',
  styleUrls: ['example-tel-input-example.css'],
  providers: [{ provide: MatFormFieldControl, useExisting: MyTelInput }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  }
})
export class MyTelInput
  implements ControlValueAccessor, MatFormFieldControl<MyTel>, OnDestroy {
  static nextId = 0;
  @ViewChild('area') areaInput!: HTMLInputElement;
  @ViewChild('exchange') exchangeInput!: HTMLInputElement;
  @ViewChild('subscriber') subscriberInput!: HTMLInputElement;

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'example-tel-input';
  id = `example-tel-input-${MyTelInput.nextId++}`;
  onChange = (_: any) => {};
  onTouched = () => {};

  get empty() {
    const {
      value: { area, exchange, subscriber }
    } = this.parts;

    return !area && !exchange && !subscriber;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input('aria-describedby') userAriaDescribedBy!: string;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder!: string;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): MyTel | null {
    if (this.parts.valid) {
      const {
        value: { area, exchange, subscriber }
      } = this.parts;
      return new MyTel(area, exchange, subscriber);
    }
    return null;
  }
  set value(tel: MyTel | null) {
    const { area, exchange, subscriber } = tel || new MyTel('', '', '');
    this.parts.setValue({ area, exchange, subscriber });
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.parts.dirty;
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl) {

    this.parts = formBuilder.group({
      area: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]
      ],
      exchange: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)]
      ],
      subscriber: [
        null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)]
      ]
    });

    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement
      .querySelector('.example-tel-input-container')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.parts.controls.subscriber.valid) {
      this._focusMonitor.focusVia(this.subscriberInput, 'program');
    } else if (this.parts.controls.exchange.valid) {
      this._focusMonitor.focusVia(this.subscriberInput, 'program');
    } else if (this.parts.controls.area.valid) {
      this._focusMonitor.focusVia(this.exchangeInput, 'program');
    } else {
      this._focusMonitor.focusVia(this.areaInput, 'program');
    }
  }

  writeValue(tel: MyTel | null): void {
    this.value = tel;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }

  static ngAcceptInputType_disabled: boolean | string | null | undefined;
  static ngAcceptInputType_required: boolean | string | null | undefined;
}