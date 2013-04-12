#!/bin/bash

mkdir -p app
cd app
mkdir -p {assets,assets/css,assets/images,assets/js,commands,models,routers,servers,templates,views}

# Add main configuration files
if [ ! -f collagen.json ]
    then
        echo "{
    \"name\": \"My Collagen.js App\",
    \"email\": \"email@example.com\",
    \"navbar\": \"static\"
}" > collagen.json
fi
if [ ! -f index.js ]
    then
        echo "var bones = require('bones');

// Add modules that need to load before your app here...
require('../modules/collagen-log');

bones.load(__dirname);

// Add modules that will override your app here..." > index.js
fi
if [ ! -f package.json ]
    then
        echo "{
    \"name\": \"collagen-app\",
    \"main\": \"./index.js\"
}" > package.json
fi

# Add CSS files
if [ ! -f assets/css/style.css ]
    then
        echo "/* Add your CSS here... */" > assets/css/style.css
fi
if [ ! -f assets/css/print.css ]
    then
        echo "/* Add your print CSS here... */" > assets/css/print.css
fi

# Copy templates
if [ ! -f templates/Footer._ ]
    then
        cp ../templates/Footer._ templates/Footer._
fi
if [ ! -f templates/Home._ ]
    then
        cp ../templates/Home._ templates/Home._
fi

echo "New app created successfully."
echo "Please see the README.md file for usage details."
echo ""

exit 0;
