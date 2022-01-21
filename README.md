# Marvel api Front-End


>Este documento especifica as principais ferramentas a ser utilizada pelo front-end da aplicação marvel, 

_**marvel api**_,



# Ambiente

**_importante**
A pasta build é gerada automaticamente, importante entender que por ser um ambiente de build nunca deve ser alterada ela, sempre qualquer alteração sempre será feito na pasta SRC

Nesse projeto utilizaremos o **BOOTSTRAP 4** como framework básico de desenvolvimento e para melhor aproveitamento das interações 
com os REQUISITOS conhecido como  um dos frameworks mais utilizados no mundo atualmente.
Para garantir código-fonte mais limpo, organizado e de fácil manuntenção, tratando-se de linguagem de folhas de estilos ou **Cascading Style Sheets (CSS)**, optamos em utilizar o **Syntactically Awesome Style Sheets (SASS)** :ok_hand: que é um pré-processador de CSS. O **Gulp.js** que é um automatizador de tarefas, que facilita na automatização das tarefas de mininficação de css, js e compilação sass, deploy e criação do ambiente de desenvolvimento, **Bower** injeção de dependências e bibiliotecas.

O ambiente **source** pasta **src** contém o  projeto a pasta **app** o core feito **angularjs** as partiasl os htmls , pasta **js** está dividida conforme molde angular dividia entre controller diretivas factorys entre outras. a pasta **contents** possui as fonts images, js , a pasta sass onde fica o core scss compilador para css já em build

* [Node.js] (https://nodejs.org/)
* [Angularjs] (https://angularjs.org/)
* [SASS] (http://sass-lang.com/)
* [Gulp.js] (http://gulpjs.com/)
* [Bower] (http://bower.io)


# Instalação	

	
##### Passo 1: Instalar Node.js VERSÃO 11.1.0 ( devido a conflitos e problemas na atual versão)
* Fazer o download e em seguida clicar no arquivo de instalação disponível em https://nodejs.org/download/ para realizar a instalação do Node.js no computador.
* O instalador do Node.js já coloca, por padrão, o caminho do Node.js no path do sistema operacional.
* Para verificar se o Node.js foi instalado com sucesso digite o comando 
**node --version** (*Command Prompt CMD (console)*) para retornar a versão instalada.


##### Passo 2: Instalar o suporte ao SASS
* Para instalar o SASS é necessário que seu sistema operacional tenha suporte para a linguagem Ruby. Para isso faça o donwload do Ruby disponível em http://rubyinstaller.org/downloads/.
* Após a instalação do Ruby, incialize o **CMD (console) com o Ruby** no seu sistema operacional e digite o comando **gem install sass**. Para iniciar a instalação do SASS.
* Para saber se o SASS foi instalado com sucesso digite o comando **sass -v** para retornar a versão atual do mesmo.

##### Passo 3: Instalar e inicializar o ambiente
* Inicie o *Command Prompt CMD (console)* do seu sistema operacional e no CMD, acesse a pasta do projeto contendo os arquivos obtidos desse repositório.
* Digite o comando **npm install** para realizar a instalação do ambiente de desenvolvimento.
* Digite o comando **npm start** ou **node start** para rodar o ambiente.

##### Passo 5: Executar a aplicação
*  (http://localhost:8081/).

###### Sobre as dependências
* Todas as bibliotecas do projetos estão instaladas via bower e npm, sendo que sempre que for preciso a inclusão de alguma biblioteca bower ou npm basta ir aos arquivos
* bower.json e npm start e colocar o nome e versão da biblioteca.

-----------------------------------------------
# Recomendações
* [Visual_Studio_Code]



