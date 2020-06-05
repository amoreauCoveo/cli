import { InvalidComponentTypeError } from '../errors';
import webpack from 'webpack';

export default class BuildService {
    constructor(webpackConfigFactory, logger, options = {}) {
        this.webpackConfigFactory = webpackConfigFactory;
        this.logger = logger;
        this.options = options;
    }

    async build(name, path, type, options = {}) {
        const { types = [] } = this.options;
        const { destination, stylesPath, stylesType, stylesDestination, dry, verbosity } = options;

        if (verbosity) {
            this.logger.debug({ ...options })
        }

        if (!(types.includes(type))) {
            throw new InvalidComponentTypeError(type, types);
        }

        const config = this.webpackConfigFactory.create(name, path, type, { verbosity, destination, stylesPath, stylesType, stylesDestination });
        let compiler;

        try {
            compiler = await this.prepareCompiler(config);
        } catch (e) {
            if (Array.isArray(e)) {
                e = new Error(e.join("\n\n"));
            }

            throw e;
        }

        if (dry) {
            return;
        }

        return await new Promise((resolve, reject) => {
            return compiler.run((err, res) => {
                if (err) {
                    return reject(err);
                }

                return resolve(res);
            })
        })
    }

    async prepareCompiler(config) {
        return await new Promise((resolve, reject) => {
            return webpack(config, (err, stats) => {
                if (err && err.details) {
                    return reject(err.details);
                }

                const info = stats.toJson();

                if (stats.hasErrors()) {
                    return reject(info.errors);
                }

                if (stats.hasWarnings()) {
                    return reject(info.warnings);
                }

                return resolve(info);
            });
        })
    }
}