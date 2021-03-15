# webTeamB1

Rezeptvorschläge aus Langeweile

# Vision

Wir als Team B1 des Moduls Webprogrammierung haben die Vision, einer Webanwendung die es ermöglicht, Rezepte nach Zutaten zu durchsuchen.

# Frontend

Im Frontend werden Rezepte, zugehörige Bilder und Links angezeigt, zudem gibt es eine Landingpage auf der ein Formular angezeigt wird, mit dem die Rezepte auf den Unterseiten durchsucht werden können.

# Backend

Im Backend werden Cookies genutzt um Informationen über die User zu acquirieren.

https://github.com/deLeafGreen/webTeamB1

# Wie wird die app gestartet?

gehen Sie in das Eltern Verzeichnis, des repository,

# Windows

## Docker build

Get-Content .\static\webdocker | docker build -

## Docker run

docker run -p 8080:3000 -i docker-image

wobei docker image die sha256 id des dockercontainers ist

# MacOs/Linux/ andere Unixoide

docker build - < ./static/webdocker

docker run -p 8080:3000 -i docker-image
