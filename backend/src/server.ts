import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Importar dependencias
import { db } from "./infrastructure/database/connection";

// Importar repositorios
import { UserRepositoryImpl } from "./infrastructure/repositories/UserRepositoryImpl";
import { ReportRepositoryImpl } from "./infrastructure/repositories/ReportRepositoryImpl";
import { WellnessRepositoryImpl } from "./infrastructure/repositories/WellnessRepositoryImpl";
import { MenuRepositoryImpl } from "./infrastructure/repositories/MenuRepositoryImpl";
import { NotificationRepositoryImpl } from "./infrastructure/repositories/NotificationRepositoryImpl";

// Importar servicios
import { AuthServiceImpl } from "./infrastructure/services/AuthServiceImpl";
import { NotificationServiceImpl } from "./infrastructure/services/NotificationServiceImpl";
// import { FileServiceImpl } from "./infrastructure/services/FileServiceImpl";

// Importar casos de uso
import { RegisterUserUseCase } from "./application/use-cases/auth/RegisterUserUseCase";
import { LoginUserUseCase } from "./application/use-cases/auth/LoginUserUseCase";
import { CreateReportUseCase } from "./application/use-cases/reports/CreateReportUseCase";
import { UpdateReportStatusUseCase } from "./application/use-cases/reports/UpdateReportStatusUseCase";
import { CreateWellnessRecordUseCase } from "./application/use-cases/wellness/CreateWellnessRecordUseCase";
import { CreateEmergencyCaseUseCase } from "./application/use-cases/wellness/CreateEmergencyCaseUseCase";
import { CreateMenuUseCase } from "./application/use-cases/menu/CreateMenuUseCase";
import { RateMenuUseCase } from "./application/use-cases/menu/RateMenuUseCase";

// Importar controladores
import { AuthController } from "./adapters/controllers/AuthController";
import { ReportController } from "./adapters/controllers/ReportController";
import { WellnessController } from "./adapters/controllers/WellnessController";
import { MenuController } from "./adapters/controllers/MenuController";
import { NotificationController } from "./adapters/controllers/NotificationController";

// Importar rutas
import { createAuthRoutes } from "./adapters/routes/authRoutes";
import { createReportRoutes } from "./adapters/routes/reportRoutes";
import { createWellnessRoutes } from "./adapters/routes/wellnessRoutes";
import { createMenuRoutes } from "./adapters/routes/menuRoutes";
import { createNotificationRoutes } from "./adapters/routes/notificationRoutes";

// Importar middleware
import {
  errorHandler,
  notFoundHandler,
} from "./adapters/middleware/errorHandler";

dotenv.config();

class Server {
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "3000");
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    // Seguridad
    this.app.use(helmet());

    // CORS - Permitir cualquier origen durante desarrollo
    this.app.use(
      cors({
        origin: process.env.NODE_ENV === 'production' 
          ? (process.env.FRONTEND_URL || "http://localhost:3000")
          : true, // Permitir cualquier origen en desarrollo
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      })
    );

    // Compresión
    this.app.use(compression());

    // Logging
    this.app.use(morgan("combined"));

    // Rate limiting - Más permisivo para desarrollo
    const limiter = rateLimit({
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000"), // 1 minuto
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "1000"), // 1000 requests por minuto
      message: "Demasiadas solicitudes desde esta IP",
      standardHeaders: true,
      legacyHeaders: false,
    });
    this.app.use("/api/", limiter);

    // Body parsing
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Servir archivos estáticos
    this.app.use("/uploads", express.static("uploads"));
  }

  private setupRoutes(): void {
    // Inicializar repositorios
    const userRepository = new UserRepositoryImpl();
    const reportRepository = new ReportRepositoryImpl();
    const wellnessRepository = new WellnessRepositoryImpl();
    const menuRepository = new MenuRepositoryImpl();
    const notificationRepository = new NotificationRepositoryImpl();

    // Inicializar servicios
    const authService = new AuthServiceImpl(userRepository);
    const notificationService = new NotificationServiceImpl(
      notificationRepository
    );
    // const fileService = new FileServiceImpl();

    // Inicializar casos de uso
    const registerUserUseCase = new RegisterUserUseCase(
      userRepository,
      authService
    );
    const loginUserUseCase = new LoginUserUseCase(authService);
    const createReportUseCase = new CreateReportUseCase(
      reportRepository,
      notificationService
    );
    const updateReportStatusUseCase = new UpdateReportStatusUseCase(
      reportRepository,
      notificationService
    );
    const createWellnessRecordUseCase = new CreateWellnessRecordUseCase(
      wellnessRepository,
      notificationService
    );
    const createEmergencyCaseUseCase = new CreateEmergencyCaseUseCase(
      wellnessRepository,
      notificationService
    );
    const createMenuUseCase = new CreateMenuUseCase(
      menuRepository,
      notificationService
    );
    const rateMenuUseCase = new RateMenuUseCase(menuRepository);

    // Inicializar controladores
    const authController = new AuthController(
      registerUserUseCase,
      loginUserUseCase,
      authService
    );
    const reportController = new ReportController(
      createReportUseCase,
      updateReportStatusUseCase,
      reportRepository
    );
    const wellnessController = new WellnessController(
      createWellnessRecordUseCase,
      createEmergencyCaseUseCase,
      wellnessRepository
    );
    const menuController = new MenuController(
      createMenuUseCase,
      rateMenuUseCase,
      menuRepository
    );
    const notificationController = new NotificationController(
      notificationService,
      notificationRepository
    );

    // Configurar rutas
    this.app.use("/api/auth", createAuthRoutes(authController));
    this.app.use("/api/reports", createReportRoutes(reportController, authService));
    this.app.use(
      "/api/wellness",
      createWellnessRoutes(wellnessController, authService)
    );
    this.app.use("/api/menus", createMenuRoutes(menuController, authService));
    this.app.use(
      "/api/notifications",
      createNotificationRoutes(notificationController, authService)
    );

    // Ruta de salud
    this.app.get("/health", (_req, res) => {
      res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    });

    // Ruta raíz
    this.app.get("/", (_req, res) => {
      res.json({
        message: "CampusApp API",
        version: "1.0.0",
        docs: "/api/docs",
      });
    });
  }

  private setupErrorHandling(): void {
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    try {
      // Probar conexión a la base de datos
      await db.query("SELECT 1");
      console.log("✅ Conexión a la base de datos establecida");

      // Iniciar servidor
      this.app.listen(this.port, () => {
        console.log(`🚀 Servidor ejecutándose en puerto ${this.port}`);
        console.log(`📱 API disponible en http://localhost:${this.port}/api`);
        console.log(`🏥 Health check en http://localhost:${this.port}/health`);
      });
    } catch (error) {
      console.error("❌ Error al iniciar el servidor:", error);
      process.exit(1);
    }
  }

  public async stop(): Promise<void> {
    await db.close();
    console.log("🛑 Servidor detenido");
  }
}

// Manejo de señales para cierre graceful
const server = new Server();

process.on("SIGTERM", async () => {
  console.log("SIGTERM recibido, cerrando servidor...");
  await server.stop();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT recibido, cerrando servidor...");
  await server.stop();
  process.exit(0);
});

// Iniciar servidor
server.start().catch((error) => {
  console.error("Error fatal:", error);
  process.exit(1);
});

export default server;
