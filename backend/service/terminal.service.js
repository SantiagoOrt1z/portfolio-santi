export const processCommand = (command) => {
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

  const [mainCommand, argument] = command.trim().toLowerCase().split(" ");

  switch (mainCommand) {
    case "help":
      return [
        "Available commands:",
        "help",
        "about",
        "project <name>",
        "skills",
        "contact",
      ];

    case "project": {
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
    }

    case "skills":
      return ["Node.js", "Express", "PostgreSQL", "REST APIs"];

    case "about":
      return [
        "Mi nombre es Santiago Ortiz",
        "Full Stack Developer orientado en Backend",
      ];

    case "contact":
      return ["email: santiagoortiz0609@hotmail.com"];

    default:
      return [`Command not found: ${command}`];
  }
};
