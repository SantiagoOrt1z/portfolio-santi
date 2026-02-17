const commands = {
  help: () => {
    return [
      "Available commands:",
      "help",
      "about",
      "project <name>",
      "skills",
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
  skills: () => {
    return ["Node.js", "Express", "PostgreSQL", "REST APIs"];
  },
  about: () => {
    return [
      "Mi nombre es Santiago Ortiz",
      "Full Stack Developer orientado en Backend",
    ];
  },
  contact: () => {
    return ["email: santiagoortiz0609@hotmail.com"];
  },
};

const projects = {
  "dojo-connect": [
    "Dojo Connect",
    "App social para desarrolladores",
    "React + Node + Express + PostgreSQL",
    "https://github.com/SantiagoOrt1z/Dojo-Connect",
  ],
  "portfolio-cmd": [
    "Portfolio CMD",
    "Simulador de terminal interactiva",
    "React + Express",
    "Lo estás viendo 😎",
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
