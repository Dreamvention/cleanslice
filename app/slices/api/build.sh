# Add to package.json
#       "build:api": "sh ./slices/setup/build.sh",

openapi --input ../api/swagger-spec.json --output ./slices/api/data/repositories/api --name ApiClient --client axios 