import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { NgForm, FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';

// Services
import { EnderecosService } from '../../shared/enderecos.service';
import { ClientesService } from '../clientes.service';
import { Estado } from '../../shared/models/estado.model';
import { Cidade } from '../../shared/models/cidade.model';

@Component({
  selector: 'app-clientes-add',
  templateUrl: './clientes-add.component.html',
  styleUrls: ['./clientes-add.component.scss']
})
export class ClientesAddComponent implements OnInit {

  @ViewChild('enderecoNumero') enderecoNumero: any;

  sendingFormData: boolean = false;
  myForm: FormGroup;
  endereco: FormGroup;
  cidade: FormGroup;
  estado: FormGroup;

  cliente: any;
  estados: Estado[] = [];
  cidades: Cidade[] = [];

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
    private clientesService: ClientesService,
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

        this.clientesService.get(this.data.id)
          .subscribe(cliente => {
            this.cliente = cliente;
            console.log('CLIENTE', this.cliente);

            this.myForm.patchValue(this.cliente);
          });

      });

    // Estados change para carregar cidades
    Observable.merge(this.myForm.get('endereco.cidade.estado_id').valueChanges)
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
      });
  }

  createForm(): void {
    this.myForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.email],
      endereco: this.fb.group({
        id: ['', Validators.required],
        cep: ['', Validators.required],
        cidade: this.fb.group({
          id: ['', Validators.required],
          estado_id: ['', Validators.required],
        }),
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
      id: [''],
      operadora: [''],
      numero: ['', Validators.required]
    });
  }

  completaEnderecoPorCep(): void {
    console.log('Completa Endereço', this.myForm.get('endereco.cep').value);
    this.enderecosService.enderecoByCep(this.myForm.get('endereco.cep').value)
      .subscribe(data => {

        this.myForm.get('endereco.cidade.id').setValue(data.cidade_id);
        this.myForm.get('endereco.cidade.estado_id').setValue(data.estado_id);
        this.myForm.get('endereco.bairro').setValue(data.bairro);
        this.myForm.get('endereco.rua').setValue(data.rua);

        this.enderecoNumero.nativeElement.focus();
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

    let actionToTake = this.clientesService.save(this.myForm.value);
    if (this.data.id) {
      actionToTake = this.clientesService.update(this.data.id, this.myForm.value);
    }
    actionToTake.subscribe();
  }

}
