# webTeamB1

Rezeptvorschläge aus Langeweile

# Vision

Wir als Team B1 des Moduls Webprogrammierung haben die Vision einer Webanwendung, die es ermöglicht, Rezepte nach Zutaten zu durchsuchen.

# Frontend

Im Frontend werden Rezepte, zugehörige Bilder und Links angezeigt, zudem gibt es eine Landingpage, auf der ein Formular angezeigt wird, mit dem die Rezepte auf den Unterseiten durchsucht werden können.

# Backend

Im Backend werden Cookies genutzt, um Informationen über die User zu akquirieren.

https://github.com/deLeafGreen/webTeamB1

# Was hat nicht geklappt?

- Es werden immer alle Kommentare von beiden Seiten und allen Usern angezeigt, statt nur Kommentare der aktuellen Seite und des aktuellen Users.
- Es wird nicht der favorisierte Inhalt des aktuellen Users angezeigt.

# Wie wird die App gestartet?

Gehen Sie in das Elternverzeichnis des Repositorys.

# Windows

## Docker build

Get-Content .\static\webdocker | docker build -

## Docker run

docker run -p 8080:3000 -i docker-image

Der String "docker image" ist hierbei durch die SHA256-ID des Docker-Containers zu ersetzen.

# MacOs/Linux/andere Unixoide

docker build - < ./static/webdocker

docker run -p 8080:3000 -i docker-image
