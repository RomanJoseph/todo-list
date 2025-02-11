interface ErrorResponse {
  code: number;
  title: string;
  message: string;
}

const ErrorDictionary = {
  'foreign key constraint': {
    code: 400,
    title: 'Erro de Dependência',
    message:
      'Este registro está vinculado a outros registros e não pode ser removido. Por favor, entre em contato com o suporte se precisar de assistência.',
  },
  'not-null constraint': {
    code: 400,
    title: 'Campo Obrigatório',
    message:
      'Um campo obrigatório está ausente. Por favor, verifique sua entrada e tente novamente.',
  },
  'unique constraint': {
    code: 400,
    title: 'Entrada Duplicada',
    message:
      'Um registro com este valor já existe. Por favor, use um valor diferente.',
  },
  'check constraint': {
    code: 400,
    title: 'Valor Inválido',
    message:
      'Um valor inválido foi fornecido. Por favor, reveja sua entrada e tente novamente.',
  },
  'value too long': {
    code: 400,
    title: 'Valor Muito Longo',
    message:
      'O valor fornecido é muito longo. Por favor, reduza-o e tente novamente.',
  },
  'record not found': {
    code: 404,
    title: 'Registro Não Encontrado',
    message:
      'O registro solicitado não foi encontrado. Por favor, verifique as informações e tente novamente.',
  },
  'server error': {
    code: 500,
    title: 'Erro no Servidor',
    message:
      'Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde. Se o problema persistir, entre em contato com o suporte.',
  },
  'invalid input syntax': {
    code: 400,
    title: 'Entrada Inválida',
    message:
      'A entrada está em um formato inválido. Por favor, verifique sua entrada e tente novamente.',
  },
  'authentication failed': {
    code: 401,
    title: 'Falha de Autenticação',
    message:
      'A autenticação falhou. Por favor, verifique suas credenciais e tente novamente.',
  },
  'authorization failed': {
    code: 403,
    title: 'Falha de Autorização',
    message:
      'Você não está autorizado a acessar este recurso. Se você acredita que isto é um erro, entre em contato com o suporte.',
  },
  'service unavailable': {
    code: 503,
    title: 'Serviço Indisponível',
    message:
      'O serviço está temporariamente indisponível. Por favor, tente novamente mais tarde.',
  },
  'connection error': {
    code: 503,
    title: 'Erro de Conexão',
    message:
      'Erro de conexão com o banco de dados. Por favor, tente novamente mais tarde.',
  },
  'timeout error': {
    code: 504,
    title: 'Erro de Tempo Esgotado',
    message:
      'O servidor demorou muito para responder. Por favor, tente novamente.',
  },
  'invalid request format': {
    code: 400,
    title: 'Requisição Inválida',
    message:
      'O formato da requisição é inválido. Por favor, verifique a documentação e tente novamente.',
  },
  'constraint violation': {
    code: 400,
    title: 'Violação de Restrição',
    message:
      'Há uma violação de restrição. Por favor, reveja sua entrada e tente novamente.',
  },
  'data corruption': {
    code: 500,
    title: 'Corrupção de Dados',
    message:
      'Corrupção de dados detectada. Por favor, entre em contato com o suporte para obter assistência.',
  },
  'user login not found': {
    code: 401,
    title: 'Login Não Encontrado',
    message:
      'Login incorreto. Por favor, verifique suas credenciais e tente novamente.',
  },
  'password not match': {
    code: 401,
    title: 'Senha Incorreta',
    message:
      'Senha incorreta. Por favor, verifique suas credenciais e tente novamente.',
  },
};

const getErrorResponse = (errorMessage: string): ErrorResponse => {
  const matchedKey = Object.keys(ErrorDictionary).find(key =>
    errorMessage.includes(key),
  ) as keyof typeof ErrorDictionary | undefined;

  if (matchedKey) {
    // eslint-disable-next-line security/detect-object-injection
    return ErrorDictionary[matchedKey];
  }

  return ErrorDictionary['server error'];
};

export { getErrorResponse };
