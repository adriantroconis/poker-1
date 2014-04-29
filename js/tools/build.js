{
    baseUrl: '../',
    mainConfigFile: '../config.js',
    paths: {
        view: 'app/view',
        controller: 'app/controller',
        model: 'app/model'
    },
    dir: '../builtJs',
    optimize: "uglify",
    skipDirOptimize: false,
    generateSourceMaps: false,
    normalizeDirDefines: "skip",
    modules: [
        {
            name: '../common',
            include: ['lib/jquery',
                      'app/bsCfg',
                      'app/controller/init'
            ]
        }
    ]
}
