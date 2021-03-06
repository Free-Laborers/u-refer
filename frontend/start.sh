#!/bin/bash

if [[ ${UREFER_BACKEND_URL} ]]; then
    python3 replaceProxy.py $UREFER_BACKEND_URL
fi

case $UREFER_ENV in
    "PROD")
        npm run build
        npm install -g serve
        serve -l 3000 -s build ;;

    "TEST")
        npm test ;;
        
    *)
        if [ "$UREFER_ENV" != "DEV" ]
        then
            echo Please set UREFER_ENV to one of DEV, PROD, TEST
            echo assuming UREFER_ENV is DEV
        fi
        npm start ;;
esac