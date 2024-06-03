--Crear base de datos
CREATE DATABASE bancosolar;
-- Conectarse a la base de datos 
\ c bancosolar;
--Crear tabla usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    balance FLOAT CHECK (balance >= 0)
);
--Crear tabla transferencias
CREATE TABLE transferencias (
    id SERIAL PRIMARY KEY,
    emisor INT,
    receptor INT,
    monto FLOAT,
    fecha TIMESTAMP,
    FOREIGN KEY (emisor) REFERENCES usuarios(id),
    FOREIGN KEY (receptor) REFERENCES usuarios(id)
);
-- Insertar usuarios de prueba 
INSERT INTO usuarios (nombre, balance)
VALUES ('Pedro Jimenez', 300000),
    ('Luis Gonzalez', 20000);
-- Insertar transferencias de prueba
INSERT INTO transferencias(emisor, receptor, monto) VALUES
    (1, 2, 1500, '2024-05-29 08:30:00'),
    (2, 1, 200000, '2024-05-28 14:45:00');