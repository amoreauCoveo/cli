import {Command, commands, terminal} from 'tramway-command';
import Logger from 'tramway-core-logger';

const {InputOption} = commands;
const {SuccessMessage, ErrorMessage} = terminal;

export default class CreateComponentCommand extends Command {
    constructor(service, logger, params = {}) {
        super();
        this.service = service;
        this.logger = logger;
        this.params = params;
    }

    configure() {
        const {defaultType, path, defaultInitStrategy} = this.params;

        this.args.add(new InputOption('name', InputOption.string).isRequired());
        this.options.add((new InputOption('template', InputOption.string, defaultType)));
        this.options.add((new InputOption('path', InputOption.string, path)));
        this.options.add(new InputOption('verbosity', InputOption.string));
        this.options.add(new InputOption('init-strategy', InputOption.string, defaultInitStrategy));
    }

    action() {
        const name = this.getArgument('name');
        const template = this.getOption('template');

        const path = this.getOption('path');
        const verbosity = this.getOption('verbosity');
        const initStrategy = this.getOption('init-strategy')

        try {
            this.service.create(name, template, {path, initStrategy});
        } catch(e) {
            if (Logger.DEBUG === verbosity) {
                this.logger.log(verbosity, e.stack);
            }

            new ErrorMessage(e.message);
            return;
        }
        
        new SuccessMessage('Component created!')
    }
}