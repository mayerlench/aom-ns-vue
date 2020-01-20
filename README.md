# Ain Od Melvado

> Prayers & Alarms

## Usage

``` bash
# Install dependencies
npm install

# Preview on device
tns preview

# Build, watch for changes and run the application
tns run

# Build, watch for changes and debug the application
tns debug <platform>

# Build for production
tns build <platform> --env.production

```

## Publishing App To Playstore

##### Add x64 Binaries
Google play requires the app have x64 binaries. If you dont add this you will not be able to publish to playstore 
In both build.gradle files build/android & AppResources/Android add the following lines in the defaultConfig
`ndk.abiFilters 'armeabi-v7a','arm64-v8a','x86','x86_64'`

##### Create a keystore
You will need to create a keystore which you will sign each version of your app (KEEP THIS SAFE, DO NOT LOSE IT)
Replacing the alias_name with a name of your choosing run the following command
`keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000`

##### Creating Android App Bundle
Creating an android app bundle builds a bundle of different apks that will work on a variety of devices
`tns build android --release --key-store-path "pathToYourKeystore" --key-store-password <YourKeystorePassword> --key-store-alias <KeystoreAlias> --key-store-alias-password <YourKeystoreAliasPassword> --aab --copy-to aab.aab`

##### Run Android App Bundle on Device
`tns run android --key-store-path "pathToYourKeystore" --key-store-password <YourKeystorePassword> --key-store-alias <KeystoreAlias> --key-store-alias-password <YourKeystoreAliasPassword> --aab`

##### Generate Google App Signing Key
From the google play console, you will be given the pepk.jar and the an encryption key to create an app signing key based off your keystore. Google gives you the snippet of code to run to generate this. You will then upload the cert to google
`java -jar pepk.jar --keystore=mykey.keystore --alias=mlenchkey --output=encrypted_private_key_path --encryptionkey=<KeyProvidedByGoogleAppSigning>`



