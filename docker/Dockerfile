FROM node:22@sha256:0e910f435308c36ea60b4cfd7b80208044d77a074d16b768a81901ce938a62dc

ENV \
    LANG=en_US.UTF-8 \
    PPTRUSER_UID=10042

# Instalar pacotes necessários para o Chrome funcionar corretamente
RUN apt-get update \
    && apt-get install -y --no-install-recommends fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros \
    fonts-kacst fonts-freefont-ttf dbus dbus-x11

# Adicionar o usuário pptruser
RUN groupadd -r pptruser && useradd -u $PPTRUSER_UID -rm -g pptruser -G audio,video pptruser

USER $PPTRUSER_UID

# Definir o diretório de trabalho no container
WORKDIR /home/pptruser

# Copiar os pacotes do Puppeteer
COPY puppeteer-browsers-latest.tgz puppeteer-latest.tgz puppeteer-core-latest.tgz ./

# Instalar o Puppeteer
RUN npm i ./puppeteer-browsers-latest.tgz ./puppeteer-core-latest.tgz ./puppeteer-latest.tgz \
    && rm ./puppeteer-browsers-latest.tgz ./puppeteer-core-latest.tgz ./puppeteer-latest.tgz

# Instalar dependências do sistema como root
USER root
RUN PUPPETEER_CACHE_DIR=/home/pptruser/.cache/puppeteer \
  npx puppeteer browsers install chrome --install-deps

USER $PPTRUSER_UID

# Gerar o arquivo THIRD_PARTY_NOTICES
RUN node -e "require('child_process').execSync(require('puppeteer').executablePath() + ' --credits', {stdio: 'inherit'})" > THIRD_PARTY_NOTICES

# Copiar todos os arquivos da raiz do seu projeto para dentro do container
COPY . /home/pptruser/

# Comando para executar o index.js
CMD ["node", "index.js"]
