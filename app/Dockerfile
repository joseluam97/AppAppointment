# Usa una imagen base de Ubuntu
FROM ubuntu:20.04

# Configurar la zona horaria para evitar bloqueos
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y tzdata

# Instalar dependencias necesarias y Node.js (y npm)
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y \
  openjdk-11-jdk \
  bash \
  wget \
  curl \
  unzip \
  git \
  libusb-1.0-0-dev \
  adb \
  lsb-release \
  && apt-get clean

# Instalar Node.js (que incluye npm)
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Verificar la instalación de Node.js y npm
RUN node -v && npm -v

# Variables de entorno necesarias para el Android SDK
ENV ANDROID_SDK_URL=https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip
ENV ANDROID_HOME=/root/Android/sdk
ENV PATH="${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin"

# Crear el directorio para el SDK y descargar los Command Line Tools
RUN mkdir -p ${ANDROID_HOME} \
  && wget ${ANDROID_SDK_URL} -O /sdk-tools.zip \
  && unzip /sdk-tools.zip -d ${ANDROID_HOME}/cmdline-tools \
  && rm /sdk-tools.zip \
  && mv ${ANDROID_HOME}/cmdline-tools/cmdline-tools ${ANDROID_HOME}/cmdline-tools/latest

# Aceptar licencias del SDK de Android
RUN yes | ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager --licenses

# Actualizar todos los paquetes del SDK
RUN ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager --update

# Instalar las herramientas de plataforma
RUN ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager "platform-tools" "platforms;android-30" "build-tools;30.0.3"

# Instalar Expo CLI globalmente
RUN npm install -g expo-cli

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y el yarn.lock (o package-lock.json)
COPY package.json ./

# Instalar dependencias de la app
RUN npm install --frozen-lockfile

# Copiar todo el código fuente de la aplicación
COPY . .

# Exponer el puerto 8080 para el servidor de React Native/Expo
EXPOSE 8080

# Ejecutar la app en Android
CMD ["npx", "expo", "run:android"]
