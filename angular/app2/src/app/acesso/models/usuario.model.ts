export class Usuario {
    constructor(
        public email: string,
        public senha: string = '',
        public nomeUsuario: string = '',
        public nomeCompleto: string = '',
        public seguindo: string[] = [],
        public seguidores: string[] = []
    ) {
       
    }
}