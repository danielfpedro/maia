import { Component, OnInit, Inject } from '@angular/core';

import { NgForm, FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';

// Services
import { EnderecosService } from '../../shared/enderecos.service';
import { Estado } from '../../shared/models/estado.model';
import { Cidade } from '../../shared/models/cidade.model';

@Component({
  selector: 'app-clientes-add',
  templateUrl: './clientes-add.component.html',
  styleUrls: ['./clientes-add.component.scss']
})
export class ClientesAddComponent implements OnInit {

  sendingFormData: boolean = false;
  myForm: FormGroup;
  endereco: FormGroup;

  estados: Estado[] = [];
  cidades: Cidade[] = [];

  selectedCity: number;

  estadoHasValue: boolean;
  carregandoCidades: boolean;
  carregandoEstados: boolean;

  maxTelefones: number = 5;

  operadoras = [
    {
      nome: 'TIM'
    }, 
    {
      nome: 'VIVO'
    }
  ];

  constructor(
    private enderecosService: EnderecosService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClientesAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
    this.createForm();

    this.carregandoEstados = true;
    this.enderecosService.allEstados()
      .subscribe(response => {
        this.estados = response;
        this.carregandoEstados = false;
      });

    // Estados change para carregar cidades
    Observable.merge(this.myForm.get('endereco.estado').valueChanges)
      .switchMap(estadoId => {
        this.carregandoCidades = true;
        this.estadoHasValue = (estadoId);

        this.cidades = [];

        if (!estadoId) {
          return Observable.of([]);
        }
        return this.enderecosService.allCidadesByEstadoId(estadoId);
      })
      .map(data => {
        this.carregandoCidades = false;
        return data;
      })
      .subscribe(cidades => {
        this.cidades = cidades;
        if (this.selectedCity) {
          this.myForm.get('endereco.cidade').setValue(this.selectedCity);
        }
      });
  }

  createForm(): void {
    this.myForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.email],
      ativo: [''],
      endereco: this.fb.group({
        cep: ['', Validators.required],
        estado: ['', Validators.required],
        cidade: ['', Validators.required],
        bairro: ['', Validators.required],
        rua: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
      }),
      telefones: this.fb.array([this.createTelefone()])
    });
  }

  get telefones(): FormArray {
    return this.myForm.get('telefones') as FormArray;
  };

  createTelefone(): FormGroup {
    return this.fb.group({
      operadora: [''],
      telefone: ['', Validators.required]
    });
  }

  completaEnderecoPorCep(): void {
    console.log('Completa Endereço', this.myForm.get('endereco.cep').value);
    this.enderecosService.enderecoByCep(this.myForm.get('endereco.cep').value)
      .subscribe(data => {
        console.log('Localidade', data);

        this.selectedCity = data.cidade_id;
        this.myForm.get('endereco.estado').setValue(data.estado_id);
        this.myForm.get('endereco.bairro').setValue(data.bairro);
        this.myForm.get('endereco.rua').setValue(data.rua);
      });
  }

  addTelefone(): void {
    this.telefones.push(this.createTelefone());
  }
  removeTelefone(index: number): void {
    this.telefones.removeAt(index);
  }
  save() {
    if (this.myForm.invalid) {
      return;
    }

    this.sendingFormData = true;
    // this.dialogRef.close();
  }

}
