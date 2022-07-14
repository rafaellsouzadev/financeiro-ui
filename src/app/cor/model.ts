
export class Endereco {
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  estado?: string;
}

export class Pessoa {
  codigo?: number;
  nome?: string;
  endereco = new Endereco();
  ativo = true;
}

export class Categoria {
  codigo?: number;  
}


export class Lancamento {
  [x: string]: any;
  codigo?: number;
  descricao?: string;
  dataVencimento!: Date;
  dataPagamento!: Date;
  valor?: number;
  tipo: string = 'RECEITA';
  observacao?: string;
  pessoa = new Pessoa();
  categoria = new Categoria();


  static toJson(lancamento: Lancamento): any {
    return {
      ...lancamento      
    };
  }
}
