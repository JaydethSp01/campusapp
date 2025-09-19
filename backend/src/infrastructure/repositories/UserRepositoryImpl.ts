import { UserRepository } from "../../ports/repositories/UserRepository";
import {
  User,
  Role,
  CreateUserRequest,
  UpdateUserRequest,
} from "../../domain/entities/User";
import { db } from "../database/connection";
import bcrypt from "bcryptjs";

export class UserRepositoryImpl implements UserRepository {
  async create(userData: CreateUserRequest): Promise<User> {
    const { nombre, email, password, roles } = userData;
    const passwordHash = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_ROUNDS || "12")
    );

    const result = await db.query(
      `
      INSERT INTO usuarios (nombre, email, password_hash, activo)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nombre, email, password_hash, activo, created_at, updated_at, deleted_at
    `,
      [nombre, email, passwordHash, true]
    );

    const user = this.mapRowToUser(result.rows[0]);

    // Asignar roles
    if (roles && roles.length > 0) {
      await this.assignRoles(user.id, roles);
    }

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const result = await db.query(
      `
      SELECT id, nombre, email, password_hash, activo, created_at, updated_at, deleted_at
      FROM usuarios
      WHERE id = $1 AND deleted_at IS NULL
    `,
      [id]
    );

    return result.rows.length > 0 ? this.mapRowToUser(result.rows[0]) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await db.query(
      `
      SELECT id, nombre, email, password_hash, activo, created_at, updated_at, deleted_at
      FROM usuarios
      WHERE email = $1 AND deleted_at IS NULL
    `,
      [email]
    );

    return result.rows.length > 0 ? this.mapRowToUser(result.rows[0]) : null;
  }

  async update(id: string, userData: UpdateUserRequest): Promise<User | null> {
    const { nombre, email, activo, roles } = userData;
    const updates: string[] = [];
    const values: unknown[] = [];
    let paramCount = 1;

    if (nombre !== undefined) {
      updates.push(`nombre = $${paramCount++}`);
      values.push(nombre);
    }
    if (email !== undefined) {
      updates.push(`email = $${paramCount++}`);
      values.push(email);
    }
    if (activo !== undefined) {
      updates.push(`activo = $${paramCount++}`);
      values.push(activo);
    }

    if (updates.length === 0) {
      return await this.findById(id);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const result = await db.query(
      `
      UPDATE usuarios
      SET ${updates.join(", ")}
      WHERE id = $${paramCount} AND deleted_at IS NULL
      RETURNING id, nombre, email, password_hash, activo, created_at, updated_at, deleted_at
    `,
      values
    );

    if (result.rows.length === 0) {
      return null;
    }

    const user = this.mapRowToUser(result.rows[0]);

    // Actualizar roles si se proporcionan
    if (roles !== undefined) {
      await db.query("DELETE FROM usuario_rol WHERE usuario_id = $1", [id]);
      if (roles.length > 0) {
        await this.assignRoles(id, roles);
      }
    }

    return user;
  }

  async delete(id: string): Promise<boolean> {
    const result = await db.query(
      `
      UPDATE usuarios
      SET deleted_at = NOW()
      WHERE id = $1 AND deleted_at IS NULL
    `,
      [id]
    );

    return result.rowCount > 0;
  }

  async assignRoles(userId: string, roleIds: number[]): Promise<void> {
    for (const roleId of roleIds) {
      await db.query(
        `
        INSERT INTO usuario_rol (usuario_id, rol_id)
        VALUES ($1, $2)
        ON CONFLICT (usuario_id, rol_id) DO NOTHING
      `,
        [userId, roleId]
      );
    }
  }

  async getUserRoles(userId: string): Promise<Role[]> {
    const result = await db.query(
      `
      SELECT r.id, r.nombre
      FROM roles r
      INNER JOIN usuario_rol ur ON r.id = ur.rol_id
      WHERE ur.usuario_id = $1
    `,
      [userId]
    );

    return result.rows.map((row: any) => ({
      id: row.id,
      nombre: row.nombre,
    }));
  }

  async getAll(): Promise<User[]> {
    const result = await db.query(`
      SELECT id, nombre, email, password_hash, activo, created_at, updated_at, deleted_at
      FROM usuarios
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
    `);

    return result.rows.map((row: any) => this.mapRowToUser(row));
  }

  async getByRole(roleId: number): Promise<User[]> {
    const result = await db.query(
      `
      SELECT u.id, u.nombre, u.email, u.password_hash, u.activo, u.created_at, u.updated_at, u.deleted_at
      FROM usuarios u
      INNER JOIN usuario_rol ur ON u.id = ur.usuario_id
      WHERE ur.rol_id = $1 AND u.deleted_at IS NULL
      ORDER BY u.created_at DESC
    `,
      [roleId]
    );

    return result.rows.map((row: any) => this.mapRowToUser(row));
  }

  private mapRowToUser(row: any): User {
    return {
      id: row.id,
      nombre: row.nombre,
      email: row.email,
      passwordHash: row.password_hash,
      activo: row.activo,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
    };
  }
}

