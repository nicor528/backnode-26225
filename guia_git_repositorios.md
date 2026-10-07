# Guía Técnica de Git: Gestión de Repositorios Anidados y Submódulos

Este documento sirve como material didáctico y técnico para comprender cómo corregir errores comunes de inicialización y cómo vincular correctamente repositorios dentro de otros utilizando Git.

---

## 1. Eliminar un repositorio Git local (sin borrar archivos)
Para quitar el rastreo de Git de cualquier carpeta y convertirla en un directorio común, se debe eliminar la carpeta oculta `.git`.

* **En macOS / Linux:**
  ```bash
  rm -rf .git
  ```
* **En Windows (PowerShell):**
  ```powershell
  Remove-Item -Recurse -Force .git
  ```

---

## 2. Corregir el error de "Carpeta Vacía con Flecha" en la Nube (Gitlink Roto)
Este problema ocurre cuando ejecutas `git init` dentro de una subcarpeta de un proyecto que ya es un repositorio de Git, creando un conflicto de índices (un submódulo accidental o gitlink). Aunque borres la carpeta `.git` interna, Git padre seguirá recordando ese enlace.

### Pasos para solucionarlo:

1. **Eliminar el enlace del índice de Git (sin borrar los archivos locales):**
   ```bash
   git rm --cached nombre_de_la_carpeta
   ```
2. **Confirmar y empujar el borrado del enlace a la nube:**
   ```bash
   git commit -m "Eliminar vinculo de subrepositorio roto"
   git push origin main
   ```
3. **Volver a agregar la carpeta como un directorio normal del proyecto:**
   ```bash
   git add nombre_de_la_carpeta
   git commit -m "Agregar carpeta como parte del proyecto principal"
   git push origin main
   ```

---

## 3. Vincular correctamente un repositorio dentro de otro (Git Submodules)
Para anidar un repositorio dentro de otro y mantenerlos vinculados de forma oficial, se deben utilizar **Submódulos de Git**. Esto permite que el proyecto hijo mantenga su propio historial y apunte a su propio repositorio remoto.

### Paso para añadir el submódulo:
Desde la raíz del proyecto principal o padre, ejecuta:
```bash
git submodule add https://github.com/usuario/repo-hijo.git nombre_de_la_carpeta
```

### Pasos para confirmar el vínculo en el proyecto padre:
```bash
git add .gitmodules nombre_de_la_carpeta
git commit -m "Agregar repositorio hijo como submódulo"
git push origin main
```
*Nota: Esto creará automáticamente un archivo `.gitmodules` que registra la URL del repositorio hijo.*

---

## 4. Clonar un proyecto que contiene submódulos
Cuando se clona un repositorio padre desde cero, las carpetas de los submódulos aparecerán vacías por defecto. Para inicializar y descargar su contenido se debe ejecutar:

```bash
git submodule update --init --recursive
```
