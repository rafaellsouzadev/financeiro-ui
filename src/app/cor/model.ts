import * as moment from "moment";

export class Pessoa {
  id?: number;
  nome?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  estado?: string;

  ativo: boolean = true;

}

export class Categoria {
  id?: number; 
  nome?: string;
}


export class Lancamento {
  id?: number;
  descricao?: string;
  dataVencimento?: Date;
  dataPagamento?: Date;
  valor?: number;
  tipo: string = 'RECEITA';
  observacao?: string;
  categoria = new Categoria();
  pessoa = new Pessoa();

  static toJson(lancamento: Lancamento): any {
    return {
      ...lancamento,
      dataVencimento: moment(lancamento.dataVencimento).format('DD/MM/YYYY'),
      dataPagamento: moment(lancamento.dataPagamento).format('DD/MM/YYYY')
    };
  }
}
