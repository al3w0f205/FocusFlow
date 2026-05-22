# FocusFlow

FocusFlow es una herramienta de productividad offline diseñada para ayudarte a mantener la concentración. Combina un temporizador Pomodoro con un gestor de tareas integrado, utilizando tecnología Vanilla JavaScript y almacenamiento en el navegador, sin necesidad de conectarse a ningún servidor ni base de datos externa.

## 🚀 Características
- **Temporizador Pomodoro:** Modos de 25, 5 y 15 minutos con animaciones de progreso.
- **Gestor de Tareas:** Agrega, marca como completadas y elimina tus tareas del día.
- **Totalmente Offline:** Utiliza la API de `LocalStorage` para guardar tu información localmente.
- **Interfaz Premium:** Diseño moderno con *Glassmorphism*, modo oscuro e iconos vectoriales interactivos.

## 💻 Instalación y Uso

Dado que es una aplicación que funciona puramente del lado del cliente, **no necesitas instalar ningún backend ni servidor** para utilizarla.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/al3w0f205/FocusFlow.git
   ```
2. Abre la carpeta `FocusFlow`.
3. Haz doble clic en el archivo `index.html` para abrirlo directamente en tu navegador web de preferencia.

## 🛠️ Entorno de Desarrollo y Pruebas

Para el desarrollo y mantenimiento del código, el proyecto cuenta con un entorno de pruebas unitarias utilizando **Jest**.

1. Instala las dependencias de desarrollo:
   ```bash
   npm install
   ```
2. Ejecuta las pruebas automatizadas:
   ```bash
   npm test
   ```

El proyecto incluye también **GitHub Actions**, por lo que al hacer `push` o abrir un `Pull Request`, los tests de Jest se ejecutarán de forma automática para asegurar la estabilidad del código.

## 📄 Licencia
Este proyecto es de uso libre y código abierto.
