# Ejemplo basico de redis para guardar informacion en cache
## Requisitos
- Se debe tener instalado redis en el ordenador 
https://redis.io/download

En el ejemplo se utilizo una imagen de docker utilizando el siguiente comando: 
```
docker run --name redis-app -p 6379:6379 -d redis
```
- **--name:** Nombre del contenedor
- **-p 6379:6379:** Enruta nuestro puerto local al puerto de redis en el contenedor
- **-d:** Permite que el contenedor se ejecute en background