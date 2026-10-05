# correr comando:
* borra la vinculacion de la carpeta con el repo

git rm --cached nombre_de_la_carpeta

# guardar los cambios:

git commit -m "Eliminar vinculo de subrepositorio roto"
git push

# volvemos a vincular la carpeta con el repo principal

git add nombre_de_la_carpeta

git commit -m "Agregar carpeta como parte del proyecto principal"

git push