#!/bin/bash

case $UREFER_ENV in
    "PROD")
        export NODE_ENV='production'
        npm start ;;

    "TEST")
        npm test ;;

    *)
        if [ "$UREFER_ENV" != "DEV" ]
        then
            echo Please set UREFER_ENV to one of DEV, PROD, TEST
            echo assuming UREFER_ENV is DEV
        fi
        npm run dev ;;
esac