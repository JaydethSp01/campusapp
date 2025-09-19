-- CampusApp Database Schema
-- PostgreSQL Database Schema for CampusApp

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Roles table
CREATE TABLE roles (
  id               SMALLINT PRIMARY KEY,
  nombre           VARCHAR(40) UNIQUE NOT NULL
);

-- Users table
CREATE TABLE usuarios (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre           TEXT NOT NULL,
  email            CITEXT UNIQUE NOT NULL,
  password_hash    TEXT NOT NULL,
  activo           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at       TIMESTAMPTZ
);

-- User roles junction table
CREATE TABLE usuario_rol (
  usuario_id       UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  rol_id           SMALLINT NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
  PRIMARY KEY (usuario_id, rol_id)
);

-- Facilities table
CREATE TABLE instalaciones (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre           VARCHAR(120) NOT NULL,
  descripcion      TEXT,
  ubicacion_texto  VARCHAR(160),
  activo           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at       TIMESTAMPTZ
);

-- SLA Policies table
CREATE TABLE sla_politicas (
  id                     SMALLSERIAL PRIMARY KEY,
  nombre                 VARCHAR(60) UNIQUE NOT NULL,
  tiempo_objetivo_horas  INTEGER NOT NULL CHECK (tiempo_objetivo_horas >= 0)
);

-- Damage reports table
CREATE TABLE reportes_danio (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instalacion_id   UUID NOT NULL REFERENCES instalaciones(id) ON DELETE RESTRICT,
  usuario_id       UUID REFERENCES usuarios(id) ON DELETE SET NULL, -- permite invitado
  prioridad_id     SMALLINT NOT NULL REFERENCES sla_politicas(id) ON DELETE RESTRICT,
  descripcion      TEXT NOT NULL,
  estado_actual    VARCHAR(20) NOT NULL
 CHECK (estado_actual IN ('pendiente','en_proceso','resuelto','verificado','escalado')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at       TIMESTAMPTZ
);

-- Report status history table
CREATE TABLE reporte_estado_historial (
  id             BIGSERIAL PRIMARY KEY,
  reporte_id     UUID NOT NULL REFERENCES reportes_danio(id) ON DELETE CASCADE,
  estado         VARCHAR(20) NOT NULL
                   CHECK (estado IN ('pendiente','en_proceso','resuelto','verificado','escalado')),
  observacion    TEXT,
  actor_id       UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Wellness records table
CREATE TABLE bienestar_registros (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id           UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  fecha                DATE NOT NULL,
  nivel_estres         SMALLINT NOT NULL CHECK (nivel_estres BETWEEN 0 AND 5),
  horas_sueno          NUMERIC(4,1) NOT NULL CHECK (horas_sueno >= 0),
  alimentacion_calidad SMALLINT NOT NULL CHECK (alimentacion_calidad BETWEEN 1 AND 3), -- 1=pobre,2=media,3=buena
  comentario           TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at           TIMESTAMPTZ
);

-- Harassment cases table
CREATE TABLE acoso_casos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id    UUID REFERENCES usuarios(id) ON DELETE SET NULL, -- NULL => anónimo
  canal         VARCHAR(20) NOT NULL, -- ayuda_rapida | form_bienestar | otro
  descripcion   TEXT NOT NULL,
  estado        VARCHAR(20) NOT NULL
                  CHECK (estado IN ('abierto','en_atencion','cerrado')),
  confidencial  BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at    TIMESTAMPTZ
);

-- Menus table
CREATE TABLE menus (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fecha       DATE NOT NULL UNIQUE,
  publicado   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Menu dishes table
CREATE TABLE menu_platos (
  id          BIGSERIAL PRIMARY KEY,
  menu_id     UUID NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
  tipo        VARCHAR(20) NOT NULL CHECK (tipo IN ('principal','acompanamiento','bebida','postre')),
  nombre      VARCHAR(120) NOT NULL
);

-- Menu ratings table
CREATE TABLE menu_calificaciones (
  id          BIGSERIAL PRIMARY KEY,
  menu_id     UUID NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
  usuario_id  UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  puntuacion  SMALLINT NOT NULL CHECK (puntuacion BETWEEN 1 AND 5),
  comentario  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notificaciones (
  id           BIGSERIAL PRIMARY KEY,
  usuario_id   UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  canal        VARCHAR(20) NOT NULL CHECK (canal IN ('push','email')),
  titulo       VARCHAR(140) NOT NULL,
  mensaje      TEXT NOT NULL,
  estado       VARCHAR(20) NOT NULL CHECK (estado IN ('pendiente','enviado','fallido')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  enviado_at   TIMESTAMPTZ
);

-- Audit logs table
CREATE TABLE auditoria_logs (
  id           BIGSERIAL PRIMARY KEY,
  actor_id     UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  entidad      VARCHAR(60) NOT NULL,     -- p.ej. 'reportes_danio'
  entidad_id   TEXT NOT NULL,            -- id del registro afectado (uuid/text)
  accion       VARCHAR(20) NOT NULL      -- create|update|delete|status_change
                    CHECK (accion IN ('create','update','delete','status_change')),
  before_json  JSONB,
  after_json   JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_activo ON usuarios(activo);
CREATE INDEX idx_usuarios_deleted_at ON usuarios(deleted_at);

CREATE INDEX idx_instalaciones_activo ON instalaciones(activo);
CREATE INDEX idx_instalaciones_deleted_at ON instalaciones(deleted_at);

CREATE INDEX idx_reportes_danio_estado ON reportes_danio(estado_actual);
CREATE INDEX idx_reportes_danio_usuario ON reportes_danio(usuario_id);
CREATE INDEX idx_reportes_danio_instalacion ON reportes_danio(instalacion_id);
CREATE INDEX idx_reportes_danio_created_at ON reportes_danio(created_at);
CREATE INDEX idx_reportes_danio_deleted_at ON reportes_danio(deleted_at);

CREATE INDEX idx_bienestar_registros_usuario ON bienestar_registros(usuario_id);
CREATE INDEX idx_bienestar_registros_fecha ON bienestar_registros(fecha);
CREATE INDEX idx_bienestar_registros_deleted_at ON bienestar_registros(deleted_at);

CREATE INDEX idx_acoso_casos_estado ON acoso_casos(estado);
CREATE INDEX idx_acoso_casos_usuario ON acoso_casos(usuario_id);
CREATE INDEX idx_acoso_casos_deleted_at ON acoso_casos(deleted_at);

CREATE INDEX idx_menus_fecha ON menus(fecha);
CREATE INDEX idx_menus_publicado ON menus(publicado);

CREATE INDEX idx_menu_platos_menu ON menu_platos(menu_id);
CREATE INDEX idx_menu_platos_tipo ON menu_platos(tipo);

CREATE INDEX idx_menu_calificaciones_menu ON menu_calificaciones(menu_id);
CREATE INDEX idx_menu_calificaciones_usuario ON menu_calificaciones(usuario_id);

CREATE INDEX idx_notificaciones_usuario ON notificaciones(usuario_id);
CREATE INDEX idx_notificaciones_estado ON notificaciones(estado);
CREATE INDEX idx_notificaciones_created_at ON notificaciones(created_at);

CREATE INDEX idx_auditoria_logs_entidad ON auditoria_logs(entidad);
CREATE INDEX idx_auditoria_logs_actor ON auditoria_logs(actor_id);
CREATE INDEX idx_auditoria_logs_created_at ON auditoria_logs(created_at);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_instalaciones_updated_at BEFORE UPDATE ON instalaciones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reportes_danio_updated_at BEFORE UPDATE ON reportes_danio FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_acoso_casos_updated_at BEFORE UPDATE ON acoso_casos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_menus_updated_at BEFORE UPDATE ON menus FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


