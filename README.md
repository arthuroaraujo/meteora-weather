# Meteora Weather

## Descrição

O Meteora oferece uma experiência meteorológica, combinando os confiáveis modelos meteorológicos NOAA GFS com o modelo meteorológico HRRR de atualização rápida. No aplicativo, você encontrará duas páginas distintas: uma dedicada à temperatura aparente e temperatura a 2 metros acima do solo, e outra destinada à velocidade do vento a 10 metros e 80 metros de altura.

## Funcionalidades

- **Dados em Tempo Real:** Visualize dados meteorológicos atualizados em tempo real.
- **Duas Páginas Distintas:** Explore informações de temperatura e velocidade do vento em páginas separadas.
- **Gráficos Interativos:** Analise tendências de temperatura e velocidade do vento com gráficos interativos.
- **Seleção de Data:** Escolha intervalos de data específicos para visualizar dados históricos.

## Tecnologias Utilizadas

- Vue.js
- Vuetify
- Chart.js
- TypeScript
- Vue Router

## Instalação

Para executar o Meteora localmente, siga as etapas abaixo:

1. Certifique-se de ter o Node.js instalado em sua máquina. Você pode fazer o download e instalar a versão mais recente do Node.js em: [https://nodejs.org](https://nodejs.org)
   
2. Clone este repositório para o seu computador usando o seguinte comando:

   ```
   git clone https://github.com/arthuroaraujo/meteora-weather.git

   ```

3. Instale as dependências do projeto utilizando o npm:

   ```
   npm install
   
   ```

4. Inicie o aplicativo localmente:

   ```
   npm run dev
   
   ```

5. Acesse o aplicativo em seu navegador através do endereço [http://localhost:3000](http://localhost:3000).

## Observações de Uso

Ao utilizar o aplicativo, é importante observar as seguintes diretrizes:

1. **Seleção de Datas**: Certifique-se de selecionar datas de início e fim ao buscar dados meteorológicos. Caso contrário, o aplicativo não será capaz de realizar a pesquisa corretamente.

2. **Validação de Datas**: As datas de início e fim devem ser válidas e estar dentro do intervalo específico de 21 de setembro de 2023 a 15 dias a partir do dia atual. Caso contrário, será exibida uma mensagem de erro indicando a necessidade de ajustar as datas selecionadas.

3. **Duração da Previsão**: A duração máxima da previsão é de 14 dias. Selecione um intervalo de datas dentro deste limite para obter resultados precisos ao buscar dados meteorológicos.

## Próximos Passos

Aqui estão alguns próximos passos que podem ser realizados para melhorar o projeto:

1. **Testagem do Aplicativo**: Para garantir a estabilidade e a confiabilidade do aplicativo, a próxima etapa é focar na testagem abrangente do sistema. Através da testagem, podemos identificar e corrigir possíveis bugs e falhas de forma proativa, assegurando uma experiência consistente e satisfatória para os usuários.

2. **Responsividade para Mobile**: Com a crescente demanda por acesso móvel, desenvolver uma versão do aplicativo otimizada para dispositivos móveis é um próximo passo essencial. Isso envolve a adaptação do layout, funcionalidades e recursos do aplicativo para oferecer uma experiência intuitiva e responsiva em smartphones e tablets.

Sinta-se à vontade para explorar essas sugestões e adicionar novos recursos e melhorias ao Meteora!
