import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;
const {SuccessMessage, ErrorMessage} = terminal;

export default class CreateSandboxCommand extends Command {
    constructor(service, logger, params = {}) {
        super();
        this.service = service;
        this.logger = logger;
        this.params = params;
    }

    configure() {
        const {path, name} = this.params;

        this.args.add(new InputOption('name', InputOption.string, name));
        this.options.add((new InputOption('path', InputOption.string, path)));
        this.options.add(new InputOption('verbosity', InputOption.string));
    }

    action() {
        const name = this.getArgument('name');
        const path = this.getOption('path');
        const verbosity = this.getOption('verbosity');

        try {
            this.service.create(path, name);
        } catch(e) {
            if (Logger.DEBUG === verbosity) {
                this.logger.log(verbosity, e.stack);
            }

            new ErrorMessage(e.message);
            return;
        }
        
        new SuccessMessage(`Page created at ${path}/${name}.html`)
    }
}