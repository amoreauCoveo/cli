import {
    CoveoSearchPageCompiler,
    CoveoClientPageUpdater,
    CoveoSearchPageBundler,
    ComponentService,
    TemplateLoader,
    PascalCaseNamingStrategy,
    CamelCaseNamingStrategy,
    BuildService,
    ProjectService,
    InstallService,
} from '../../services';

export default {
    "service.coveosearchpagecompiler": {
        "class": CoveoSearchPageCompiler,
        "constructor": [
            {"type": "parameter", "key": "searchPageCompiler"},
        ],
    },
    "service.coveoclientpageupdater": {
        "class": CoveoClientPageUpdater,
        "constructor": [],
    },
    "service.coveosearchpagebundler": {
        "class": CoveoSearchPageBundler,
        "constructor": [
            {"type": "service", "key": "service.coveosearchpagecompiler"},
            {"type": "service", "key": "service.coveoclientpageupdater"},
        ],
    },
    "service.component": {
        "class": ComponentService,
        "constructor": [
            {"type": "service", "key": "factory.component"},
            {"type": "service", "key": "factory.index"},
            {"type": "service", "key": "provider.file"},
            {"type": "parameter", "key": "component"},
        ],
    },
    "service.templateloader": {
        "class": TemplateLoader,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "service", "key": "resolver.template"},
            '../../templates/components',
        ],
    },
    "service.indexloader": {
        "class": TemplateLoader,
        "constructor": [
            {"type": "service", "key": "provider.file"},
            {"type": "service", "key": "resolver.template"},
            '../../templates/index',
        ],
    },
    "service.naming.pascalcase": {
        "class": PascalCaseNamingStrategy,
        "constructor": [],
    },
    "service.naming.camelcase": {
        "class": CamelCaseNamingStrategy,
        "constructor": [],
    },
    "service.build": {
        "class": BuildService,
        "constructor": [
            {"type": "service", "key": "factory.webpackconfig"},
            {"type": "parameter", "key": "component"},
        ],
    },
    "service.project": {
        "class": ProjectService,
        "constructor": [
            {"type": "service", "key": "resolver.basefiles"},
            {"type": "service", "key": "provider.file"},
            {"type": "service", "key": "resolver.libraries"},
            {"type": "service", "key": "service.install"},
        ],
    },
    "service.install": {
        "class": InstallService,
        "constructor": [],
    },
}
