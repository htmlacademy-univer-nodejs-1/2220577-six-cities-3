#!/usr/bin/env node
import { HelpCommand } from './cli/commands/help.command.js';
import { ImportCommand } from './cli/commands/import.command.js';
import { VersionCommand } from './cli/commands/version.command.js';
import {CliApplication} from './cli/index.js';

function bootstrap() {
  const cliApplication = new CliApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
