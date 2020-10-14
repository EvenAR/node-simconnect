{
    "targets": [
        {
            "target_name": "node_simconnect",
            "sources": [ 
                "src/simconnect-handler.cc",
                "src/simconnect-handler.h",
                "src/commons.h",
                "src/NodeSimconnect.h",
                "src/NodeSimconnect.cc",
                "src/NodeSimconnectHandler.h",
                "src/NodeSimconnectHandler.cc",
                "src/NodeSimconnectHandler.cc",
                "src/DispatchProgressWorker.h",
                "src/DispatchProgressWorker.cc",
            ],
            'include_dirs': [
                "SimConnect/Inc",
                "<!@(node -p \"require('node-addon-api').include\")",
            ],
            "link_settings": {
                "libraries": [
                    "../SimConnect/lib/SimConnect"
                ]
            },
            'cflags!': [ '-fno-exceptions' ],
            'cflags_cc!': [ '-fno-exceptions' ],
            'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
            'configurations': {
                'Debug': {
                    'msvs_settings': {
                        'VCCLCompilerTool': {
                            'RuntimeLibrary': '3', # /MDd
                            'ExceptionHandling': 1,
                            'AdditionalOptions': [ '-std:c++17', ],
                        }
                    }
                },
                'Release': {
                    'msvs_settings': {
                        'VCCLCompilerTool': {
                            'RuntimeLibrary': '2', # /MD
                            'ExceptionHandling': 1,
                            'AdditionalOptions': [ '-std:c++17', ],
                        },
                    }
                }
            }
        }
    ]
}