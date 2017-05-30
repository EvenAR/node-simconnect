{
    "targets": [
        {
            "target_name": "node-simconnect",
            "sources": [ "addon.cc" ],
            "include_dirs": [
                "SimConnect/Inc",
				"<!(node -e \"require('nan')\")"
            ],
            "link_settings": {
                "libraries": [
                    "../SimConnect/lib/SimConnect"
                ]
            },
            'configurations': {
                'Debug': {
                    'msvs_settings': {
                                'VCCLCompilerTool': {
                                    'RuntimeLibrary': '3' # /MDd
                        }
                    }
                },
                'Release': {
                    'msvs_settings': {
                                'VCCLCompilerTool': {
                                    'RuntimeLibrary': '2' # /MD
                        }
                    }
                }
            }
        }
    ]
    
	
	
}