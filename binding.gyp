{
    "targets": [
        {
            "target_name": "node_simconnect",
            "sources": [ 
                "src/simconnect_session.cc",
                "src/simconnect_session.h",
                "src/commons.h",
                "src/binding.h",
                "src/binding.cc",
                "src/sim_handler.h",
                "src/sim_handler.cc",
                "src/dispatch_queue_worker.h",
                "src/dispatch_queue_worker.cc",
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