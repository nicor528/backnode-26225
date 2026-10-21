nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225/clase-7$ cd ..
nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225$ git submodule add https://github.com/usuario/repo-hijo.git clase-9/test
fatal: 'clase-9/test' ya existe en el índice
nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225$ 
nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225$ git rm --cached clase-9/test
fatal: no eliminando 'clase-9/test' de manera recursiva sin -r
nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225$ git rm --cached clase-9/test -f
fatal: no eliminando 'clase-9/test' de manera recursiva sin -r
nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225$ git m --cached clase-9/test -f
git: 'm' no es un comando de git. Mira 'git --help'.

Los comandos más similares son
        merge
        mv
        am
        rm
nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225$ git rm --cached clase-9/test -f
fatal: no eliminando 'clase-9/test' de manera recursiva sin -r
nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225$ git rm --cached clase-9/test --f
fatal: no eliminando 'clase-9/test' de manera recursiva sin -r
nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225$ git rm -r --cached clase-9/test
rm 'clase-9/test/.gitignore'
rm 'clase-9/test/index.js'
rm 'clase-9/test/package-lock.json'
rm 'clase-9/test/package.json'
nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225$ git commit -m "Eliminar vinculo de subrepositorio roto2"
[main 7201e98] Eliminar vinculo de subrepositorio roto2
 4 files changed, 940 deletions(-)
 delete mode 100644 clase-9/test/.gitignore
 delete mode 100644 clase-9/test/index.js
 delete mode 100644 clase-9/test/package-lock.json
 delete mode 100644 clase-9/test/package.json
nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225$ ^[[200~git push origin main
git: no se encontró la orden
nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225$ 
nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225$ ~^C
nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225$ git push origin main

Enumerando objetos: 5, listo.
Contando objetos: 100% (5/5), listo.
Compresión delta usando hasta 4 hilos
Comprimiendo objetos: 100% (3/3), listo.
Escribiendo objetos: 100% (3/3), 307 byte | 307.00 KiB/s, listo.
Total 3 (delta 2), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To https://github.com/nicor528/backnode-26225.git
   b22582b..7201e98  main -> main
nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225$ git submodule add https://github.com/nicor528/subrepo-c9-test.git clase-9/test
fatal: 'clase-9/test' ya existe y no es un repositorio git válido
nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225$ git submodule add https://github.com/nicor528/subrepo-c9-test.git ./clase-9/test
fatal: 'clase-9/test' ya existe y no es un repositorio git válido
nicolas-riquelme@nicolas-riquelme-Lenovo-ideapad-320-14IKB:/run/media/nicolas-riquelme/DATA/T
alento/práctica/backnode-26225$ 


# no podiamos crear el subrepo