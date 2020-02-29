# js Calc

> ## Resumo
*js Calc* é uma calculadora padrão 100% funcional construída a partir de javascript.

### [Visite a página](https://fabbiodiaz.github.io/js-calc)
<br>

> ## Escopo do projeto
Criar uma calculadora padrão atendendo as seguintes premissas:
-   [x] O usuário verá atráves de um display o número que foi inserido, ou o resultado da última operação.
-   [x] O Usuário será apresentado a uma interface com botoes que representem os números (0-9), um botão para input de números decimais ('.'), botões que representem as quatro operações básicas ('+', '-', '*' e '/'), um botão de limpar a memória ('CE'), um botão dedicado para troca de sinal do valor de input (+/-), um botão de backspace para correções e um botão para processamento ('=').
-   [x] Qualquer input com até 8 algarismos será aceito (não contando '-' ou '.' como algarismos), após preenchidos os 8 algarismos, qualquer entrada adicional deve ser ignorada.
-   [x] Ao clicar no botão de uma das 4 operações, a calculadora deve exibir no display padrão:
    * O resultado da operação solicitada, utilizando o último resultado e o último número informado
    * O resultado da operação solicitada, utilizando os dois últimos números informados
    * O último resultado e o último número informado
-   [x] Ao clicar no botão 'CE', a memória deve ser apagada, ao clicar no botão 'backspace' o último dígito adicionado deve ser apagado.
-   [x] Em caso de uma operação resultar em um número que extrapole o limite de 8 algarismos numéricos, deve ser exibida uma mensagem de erro ('err'), e a memória deve ser apagada.
-   [x] As operações com números decimais devem resultar em número de até 3 casas decimais, sempre respeitando a significância, e não exibindo algarismos não-significantes.
-   [x] A página deve ser responsiva, e funcionar bem em todas as proporções de tela, e em ambas as orientações.


> ## Ferramentas utilizadas

* *Javascript*

Para viabilizar o projeto, foi necessário utilizar Javascript para realizar toda a lógica de negócio, assim como as manipulações na DOM.

* *CSS*

O CSS foi utilizado para dar forma aos componentes e garantir a responsividade. Toda a interface (desde o alinhamento da calculadora na tela, até a disposição dos botões) foi viabilizada utilizando flexbox.

* *HTML*

O esquema da página consiste num background escuro, onde são dispostos os componentes da aplicação (displal, botões) e um footer com um link que leva ao repositório do projeto no GitHub.
