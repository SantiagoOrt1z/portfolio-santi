const commands = {
  help: () => {
    return [
      "Available commands:",
      "help",
      "about",
      "project <name>",
      "skills",
      "experience",
      "contact",
    ];
  },
  project: (argument) => {
    if (!argument) {
      return ["Please specify a project name.", ...Object.keys(projects)];
    }
    if (!projects[argument]) {
      return [
        `Project "${argument}" not found.`,
        "Available projects:",
        ...Object.keys(projects),
      ];
    }
    return projects[argument];
  },
  experience: () => {
    return [
      "DEVOCAMP STARTUP",
      "Desarrollador Backend",
      "2023-2024 || Django Framework",
      "Desarrollo de Funcionalidades Core: Implementación demódulos críticos como sistemas de autenticación(Inicio/Cierre de sesión) y gestión de sesiones de usuario utilizando Django.",
      "Ciclo de Vida de Software: Gestión de tareas mediante tableros ágiles, cumpliendo con la entrega de requerimientos técnicos y funcionales en tiempos cortos.",
      "Calidad de Código: Responsable de la escritura de tests unitarios y pruebas de integración para asegurar la estabilidad del sistema antes del despliegue.",
      "Colaboración Técnica: Participación activa en el flujo de Code Reviews y manejo de versiones con Git, asegurando la integridad de la rama principal (main branch).",
    ];
  },
  skills: () => {
    return [
      "Backend Stack:",
      "  - Node.js / Express",
      "  - PostgreSQL",
      "  - REST API design",
      "  - Middleware & routing",
      "",
      "Frontend:",
      "  - React (Vite)",
      "  - Fetch API",
      "",
      "Enfoque:",
      "  - Arquitectura limpia",
      "  - Código modular",
      "  - Buenas prácticas",
    ];
  },
  about: () => {
    return [
      "Santiago Ortiz",
      "Full Stack Developer orientado al Backend",
      "Desarrollo aplicaciones web con foco en la arquitectura del backend, diseño de APIs REST y modelado de bases de datos relacionales.",
      "Con experiencia previa en una startup, trabajando en entornos colaborativos y en desarrollo de producto real.",
      "Trabajo principalmente con Node.js, Express y PostgreSQL, complementando con interfaces funcionales en React cuando es necesario.",
      "Busco seguir creciendo dentro de un equipo profesional donde pueda fortalecer mis habilidades técnicas y aportar soluciones bien estructuradas.",
    ];
  },
  contact: () => {
    return [
      "Email: santiagoortiz0609@hotmail.com",
      "Phone Number: +54 9 11 3393-3560",
      "Github: https://github.com/SantiagoOrt1z",
      "LinkedIn: https://www.linkedin.com/in/santiago-ortiz-673216227/",
    ];
  },
};

const projects = {
  "dojo-connect": [
    "Dojo Connect",
    "Red social para amantes de los deportes de contacto",
    "React + Node + Express + PostgreSQL",
    "https://github.com/SantiagoOrt1z/Dojo-Connect",
  ],
  "portfolio-cmd": [
    "Portfolio CMD",
    "Simulador de terminal interactiva",
    "React + Express",
    "Lo estás viendo 😎, pero si queres ver el codigo y como lo construí: https://github.com/SantiagoOrt1z/portfolio-santi",
  ],
};

export const processCommand = (command) => {
  if (!command || typeof command !== "string") {
    return ["Invalid command"];
  }

  const [mainCommand, argument] = command.trim().toLowerCase().split(/\s+/);

  if (!commands[mainCommand]) {
    return [`Command not found: ${mainCommand}`];
  }

  return commands[mainCommand](argument);
};
