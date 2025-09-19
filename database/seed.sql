-- CampusApp Seed Data
-- Datos de prueba para desarrollo

-- Insertar roles
INSERT INTO roles (id, nombre) VALUES 
(1, 'estudiante'),
(2, 'mantenimiento'),
(3, 'bienestar'),
(4, 'comedor'),
(5, 'admin'),
(6, 'docente');

-- Insertar SLA políticas
INSERT INTO sla_politicas (nombre, tiempo_objetivo_horas) VALUES 
('Crítica', 2),
('Alta', 8),
('Media', 24),
('Baja', 72);

-- Insertar instalaciones
INSERT INTO instalaciones (nombre, descripcion, ubicacion_texto) VALUES 
('Aula 204 - Bloque B', 'Aula de clases generales', 'Bloque B, Segundo piso'),
('Laboratorio Redes', 'Laboratorio de redes y telecomunicaciones', 'Bloque C, Primer piso'),
('Biblioteca', 'Biblioteca central de la universidad', 'Edificio principal, Tercer piso'),
('Auditorio Principal', 'Auditorio para eventos y conferencias', 'Edificio principal, Primer piso'),
('Cafetería', 'Cafetería principal del campus', 'Edificio principal, Planta baja'),
('Aula 8204', 'Aula de posgrado', 'Bloque A, Octavo piso'),
('Laboratorio Multimedia', 'Laboratorio de producción multimedia', 'Bloque D, Segundo piso'),
('Gimnasio', 'Instalaciones deportivas', 'Edificio deportivo, Primer piso'),
('Sala de Juntas', 'Sala de reuniones administrativas', 'Edificio administrativo, Segundo piso'),
('Laboratorio Química', 'Laboratorio de química general', 'Bloque E, Primer piso');

-- Insertar usuarios de prueba
INSERT INTO usuarios (nombre, email, password_hash, activo) VALUES 
('Admin CampusApp', 'admin@campusapp.edu', '$2a$12$aQb7DNutHu4eSvujtFKoK.gwntTtioSsQ/E6KolhXI1QsvMOASkQO', true),
('Juan Pérez', 'juan.perez@estudiante.edu', '$2a$12$aQb7DNutHu4eSvujtFKoK.gwntTtioSsQ/E6KolhXI1QsvMOASkQO', true),
('María García', 'maria.garcia@estudiante.edu', '$2a$12$aQb7DNutHu4eSvujtFKoK.gwntTtioSsQ/E6KolhXI1QsvMOASkQO', true),
('Carlos López', 'carlos.lopez@mantenimiento.edu', '$2a$12$aQb7DNutHu4eSvujtFKoK.gwntTtioSsQ/E6KolhXI1QsvMOASkQO', true),
('Ana Martínez', 'ana.martinez@bienestar.edu', '$2a$12$aQb7DNutHu4eSvujtFKoK.gwntTtioSsQ/E6KolhXI1QsvMOASkQO', true),
('Pedro Rodríguez', 'pedro.rodriguez@comedor.edu', '$2a$12$aQb7DNutHu4eSvujtFKoK.gwntTtioSsQ/E6KolhXI1QsvMOASkQO', true),
('Prof. Elena Vargas', 'elena.vargas@docente.edu', '$2a$12$vMlsX061HaRsPPBtGVbs7OhGwHgY861cr/Es7facB7oJg8WII4nXO', true);

-- Asignar roles a usuarios
INSERT INTO usuario_rol (usuario_id, rol_id) VALUES 
((SELECT id FROM usuarios WHERE email = 'a'), 5),
((SELECT id FROM usuarios WHERE email = 'juan.perez@estudiante.edu'), 1),
((SELECT id FROM usuarios WHERE email = 'maria.garcia@estudiante.edu'), 1),
((SELECT id FROM usuarios WHERE email = 'carlos.lopez@mantenimiento.edu'), 2),
((SELECT id FROM usuarios WHERE email = 'ana.martinez@bienestar.edu'), 3),
((SELECT id FROM usuarios WHERE email = 'pedro.rodriguez@comedor.edu'), 4),
((SELECT id FROM usuarios WHERE email = 'elena.vargas@docente.edu'), 6);

-- Insertar reportes de daño de prueba
INSERT INTO reportes_danio (instalacion_id, usuario_id, prioridad_id, descripcion, estado_actual) VALUES 
((SELECT id FROM instalaciones WHERE nombre = 'Aula 204 - Bloque B'), (SELECT id FROM usuarios WHERE email = 'juan.perez@estudiante.edu'), 2, 'El proyector presenta fallas intermitentes durante las presentaciones', 'pendiente'),
((SELECT id FROM instalaciones WHERE nombre = 'Laboratorio Redes'), (SELECT id FROM usuarios WHERE email = 'maria.garcia@estudiante.edu'), 1, 'El switch principal está completamente averiado, no hay conexión a internet', 'en_proceso'),
((SELECT id FROM instalaciones WHERE nombre = 'Biblioteca'), (SELECT id FROM usuarios WHERE email = 'juan.perez@estudiante.edu'), 3, 'La puerta principal tiene problemas con la cerradura electrónica', 'resuelto'),
((SELECT id FROM instalaciones WHERE nombre = 'Cafetería'), (SELECT id FROM usuarios WHERE email = 'maria.garcia@estudiante.edu'), 4, 'Una mesa tiene una pata suelta', 'pendiente');

-- Insertar historial de estados
INSERT INTO reporte_estado_historial (reporte_id, estado, observacion, actor_id) VALUES 
((SELECT id FROM reportes_danio WHERE descripcion LIKE '%proyector%'), 'pendiente', 'Reporte recibido', NULL),
((SELECT id FROM reportes_danio WHERE descripcion LIKE '%switch%'), 'pendiente', 'Reporte recibido', NULL),
((SELECT id FROM reportes_danio WHERE descripcion LIKE '%switch%'), 'en_proceso', 'Técnico asignado, revisando el equipo', (SELECT id FROM usuarios WHERE email = 'carlos.lopez@mantenimiento.edu')),
((SELECT id FROM reportes_danio WHERE descripcion LIKE '%puerta%'), 'pendiente', 'Reporte recibido', NULL),
((SELECT id FROM reportes_danio WHERE descripcion LIKE '%puerta%'), 'en_proceso', 'Técnico asignado', (SELECT id FROM usuarios WHERE email = 'carlos.lopez@mantenimiento.edu')),
((SELECT id FROM reportes_danio WHERE descripcion LIKE '%puerta%'), 'resuelto', 'Cerradura reemplazada y funcionando correctamente', (SELECT id FROM usuarios WHERE email = 'carlos.lopez@mantenimiento.edu'));

-- Insertar registros de bienestar
INSERT INTO bienestar_registros (usuario_id, fecha, nivel_estres, horas_sueno, alimentacion_calidad, comentario) VALUES 
((SELECT id FROM usuarios WHERE email = 'juan.perez@estudiante.edu'), '2024-01-15', 3, 7.5, 2, 'Día normal, un poco estresado por los exámenes'),
((SELECT id FROM usuarios WHERE email = 'juan.perez@estudiante.edu'), '2024-01-16', 4, 6.0, 1, 'Muy estresado, dormí mal'),
((SELECT id FROM usuarios WHERE email = 'maria.garcia@estudiante.edu'), '2024-01-15', 2, 8.0, 3, 'Me siento bien hoy'),
((SELECT id FROM usuarios WHERE email = 'maria.garcia@estudiante.edu'), '2024-01-16', 1, 8.5, 3, 'Excelente día, descansé bien'),
((SELECT id FROM usuarios WHERE email = 'juan.perez@estudiante.edu'), '2024-01-17', 5, 5.0, 1, 'Crisis de ansiedad, necesito ayuda');

-- Insertar casos de acoso
INSERT INTO acoso_casos (usuario_id, canal, descripcion, estado, confidencial) VALUES 
((SELECT id FROM usuarios WHERE email = 'juan.perez@estudiante.edu'), 'ayuda_rapida', 'Crisis de ansiedad en pasillo bloque B', 'abierto', true),
((SELECT id FROM usuarios WHERE email = 'maria.garcia@estudiante.edu'), 'form_bienestar', 'Conflicto en cafetería con compañero', 'en_atencion', true),
(NULL, 'ayuda_rapida', 'Reporte anónimo de acoso en biblioteca', 'abierto', true);

-- Insertar menús
INSERT INTO menus (fecha, publicado) VALUES 
('2024-01-15', true),
('2024-01-16', true),
('2024-01-17', true),
('2024-01-18', true),
('2024-01-19', false);

-- Insertar platos de menú
INSERT INTO menu_platos (menu_id, tipo, nombre) VALUES 
-- Menú 2024-01-15
((SELECT id FROM menus WHERE fecha = '2024-01-15'), 'principal', 'Arroz con pollo'),
((SELECT id FROM menus WHERE fecha = '2024-01-15'), 'acompanamiento', 'Ensalada fresca'),
((SELECT id FROM menus WHERE fecha = '2024-01-15'), 'bebida', 'Jugo de mango'),
((SELECT id FROM menus WHERE fecha = '2024-01-15'), 'postre', 'Gelatina'),
-- Menú 2024-01-16
((SELECT id FROM menus WHERE fecha = '2024-01-16'), 'principal', 'Pasta con salsa bolognesa'),
((SELECT id FROM menus WHERE fecha = '2024-01-16'), 'acompanamiento', 'Vegetales al vapor'),
((SELECT id FROM menus WHERE fecha = '2024-01-16'), 'bebida', 'Limonada natural'),
((SELECT id FROM menus WHERE fecha = '2024-01-16'), 'postre', 'Flan de vainilla'),
-- Menú 2024-01-17
((SELECT id FROM menus WHERE fecha = '2024-01-17'), 'principal', 'Pescado a la plancha'),
((SELECT id FROM menus WHERE fecha = '2024-01-17'), 'acompanamiento', 'Arroz blanco'),
((SELECT id FROM menus WHERE fecha = '2024-01-17'), 'bebida', 'Jugo de naranja'),
((SELECT id FROM menus WHERE fecha = '2024-01-17'), 'postre', 'Brownie de chocolate');

-- Insertar calificaciones de menú
INSERT INTO menu_calificaciones (menu_id, usuario_id, puntuacion, comentario) VALUES 
((SELECT id FROM menus WHERE fecha = '2024-01-15'), (SELECT id FROM usuarios WHERE email = 'juan.perez@estudiante.edu'), 4, 'Muy rico el arroz con pollo'),
((SELECT id FROM menus WHERE fecha = '2024-01-15'), (SELECT id FROM usuarios WHERE email = 'maria.garcia@estudiante.edu'), 5, 'Excelente sazón hoy'),
((SELECT id FROM menus WHERE fecha = '2024-01-16'), (SELECT id FROM usuarios WHERE email = 'juan.perez@estudiante.edu'), 2, 'La sopa estaba fría'),
((SELECT id FROM menus WHERE fecha = '2024-01-16'), (SELECT id FROM usuarios WHERE email = 'maria.garcia@estudiante.edu'), 3, 'Poca variedad de ensaladas'),
((SELECT id FROM menus WHERE fecha = '2024-01-17'), (SELECT id FROM usuarios WHERE email = 'juan.perez@estudiante.edu'), 4, 'Mejoró el postre'),
((SELECT id FROM menus WHERE fecha = '2024-01-17'), (SELECT id FROM usuarios WHERE email = 'maria.garcia@estudiante.edu'), 3, 'Faltó jugo natural');

-- Insertar notificaciones
INSERT INTO notificaciones (usuario_id, canal, titulo, mensaje, estado, enviado_at) VALUES 
((SELECT id FROM usuarios WHERE email = 'juan.perez@estudiante.edu'), 'push', 'Nuevo menú disponible', 'Se ha publicado el menú del día de hoy', 'enviado', NOW()),
((SELECT id FROM usuarios WHERE email = 'maria.garcia@estudiante.edu'), 'push', 'Actualización de reporte', 'Tu reporte #123 ha sido actualizado a En proceso', 'enviado', NOW()),
((SELECT id FROM usuarios WHERE email = 'admin@campusapp.edu'), 'email', 'Nuevo reporte de daño', 'Se ha recibido un nuevo reporte de daño en Aula 204', 'pendiente', NULL);

