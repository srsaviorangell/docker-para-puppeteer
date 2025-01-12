FROM node:current

# Instalar pacotes necessários para o Chrome funcionar corretamente
RUN apt-get update && apt-get install -y \
  libxss1 \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libgbm1 \
  libdrm2 \
  libdrm-dev \
  fonts-liberation \
  xdg-utils \
  wget \
  ca-certificates \
  --no-install-recommends

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências do Node.js e Puppeteer
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "index.js"]