// app.config.js
module.exports = () => ({
  name: "Kevin Durkan Trophy",
  slug: "golf-weekend",
  scheme: "kdt",
  // 👇 App icon shown on the home screen / app list
  icon: "./assets/brand/kdt-logo.png",

  // 👇 Splash shown while the JS bundle loads
  splash: {
    image: "./assets/brand/kdt-splash.png",
    backgroundColor: "#0a1a38",    // your navy
    resizeMode: "contain"          // keeps full logo visible
  },

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
