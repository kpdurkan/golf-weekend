// app.config.js
module.exports = () => ({
  name: "Kevin Durkan Trophy",
  slug: "golf-weekend",
  scheme: "kdt",
  
  icon: "./assets/brand/kdt-logo.png",           // your existing app icon
  splash: {
    image: "./assets/brand/kdt-splash.png",      // use 2048×2048
    backgroundColor: "#0a1a38",
    resizeMode: "contain"
  },
  // optional adaptive icon on Android:
  // android: { adaptiveIcon: { foregroundImage: "./assets/brand/kdt-logo.png", backgroundColor: "#0a1a38" } },


  ios: {
    bundleIdentifier: "com.kdurkan.kdt",
    jsEngine: "hermes",
    infoPlist: { ITSAppUsesNonExemptEncryption: false }
  },
  android: {
    package: "com.kdurkan.kdt",
    jsEngine: "hermes",
    // (optional) adaptive icon setup if you have foreground layer:
    // adaptiveIcon: {
    //   foregroundImage: "./assets/brand/kdt-logo.png",
    //   backgroundColor: "#0a1a38"
    // }
  },
  platforms: ["ios","android","web"],
  web: { bundler: "metro" },
  extra: { eas: { projectId: "6e99c8c2-9d72-47e7-a82b-4cc1eaa48380" } }
});
