#  Add to package.json
#     "capacitor-update": "npm run generate && sh ./slices/capacitor/build.sh",
#     "build:ios": "npm run capacitor-update && cd slices/capacitor  && npx cap sync &&  npx cap open ios",
#     "build:android": "npm run capacitor-update && cd slices/capacitor  && npx cap sync && npx cap open android"

mkdir -p ./slices/capacitor/www/ && cp -R ./.output/public/* ./slices/capacitor/www/