# Utilizza l'immagine ufficiale di PostgreSQL come base
FROM postgres:13

# Imposta le variabili d'ambiente necessarie
ENV POSTGRES_DB=garage
ENV POSTGRES_USER=nextjs
ENV POSTGRES_PASSWORD=test

# Copia eventuali file SQL di inizializzazione (opzionale)
COPY init.sql /docker-entrypoint-initdb.d/

# Espone la porta 5432
EXPOSE 5432
