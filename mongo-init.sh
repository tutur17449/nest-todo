#!/bin/bash
set -e

mongo <<EOF
use $MONGO_INITDB_DATABASE

db.createUser(
  {
      user: '$MONGO_USERNAME',
      pwd: '$MONGO_PW',
      roles: [
          {
              role: 'readWrite',
              db: '$MONGO_INITDB_DATABASE'
          }
      ]
  }
);

EOF